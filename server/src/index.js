const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const { EventEmitter } = require('events');

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const app = express();
app.use(express.json({ limit: '1mb' }));
const allowedOrigins = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }
      if (allowedOrigins.length === 0) {
        return callback(new Error('CORS origin not allowed'), false);
      }
      const isAllowed = allowedOrigins.includes(origin);
      return callback(isAllowed ? null : new Error('CORS origin not allowed'), isAllowed);
    },
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  })
);

const PORT = Number(process.env.PORT || 8787);
const LLM_PROVIDER = (process.env.LLM_PROVIDER || 'openai').toLowerCase();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4.1-mini';
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || '';
const ANTHROPIC_MODEL = process.env.ANTHROPIC_MODEL || 'claude-3-5-sonnet-20241022';
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const TELEGRAM_ADMIN_CHAT_ID = process.env.TELEGRAM_ADMIN_CHAT_ID || '';
const CHROMA_URL = process.env.CHROMA_URL || '';
const CHROMA_COLLECTION_RAW = process.env.CHROMA_COLLECTION || 'morn-knowledge';
const CHROMA_COLLECTION = /^[a-zA-Z0-9_-]+$/.test(CHROMA_COLLECTION_RAW)
  ? CHROMA_COLLECTION_RAW
  : 'morn-knowledge';
const RAG_TOP_K = Number(process.env.RAG_TOP_K || 4);
const MAX_HISTORY = Number(process.env.MAX_HISTORY || 8);

const HANDOVER_MESSAGE =
  process.env.HANDOVER_MESSAGE ||
  'The Architect has entered the terminal. I am shifting to observer mode to allow for direct synchronization.';
const RETURN_MESSAGE =
  process.env.RETURN_MESSAGE ||
  'The Architect has stepped back. I am resuming autonomous guidance.';

const sessions = new Map();
const events = new EventEmitter();

const loadSystemPrompt = () => {
  if (process.env.SYSTEM_PROMPT) {
    return process.env.SYSTEM_PROMPT;
  }
  const promptPath =
    process.env.SYSTEM_PROMPT_PATH ||
    path.join(__dirname, '..', 'config', 'systemPrompt.txt');
  try {
    return fs.readFileSync(promptPath, 'utf8').trim();
  } catch (error) {
    return 'You are MoRN AI, a Sovereign Architect persona. Add your full system prompt in server/config/systemPrompt.txt.';
  }
};

const SYSTEM_PROMPT = loadSystemPrompt();

if (CHROMA_COLLECTION !== CHROMA_COLLECTION_RAW) {
  console.warn('Invalid CHROMA_COLLECTION detected, falling back to "morn-knowledge".');
}

const getSession = (sessionId) => {
  if (!sessionId) {
    return null;
  }
  if (!sessions.has(sessionId)) {
    sessions.set(sessionId, {
      id: sessionId,
      messages: [],
      isManualMode: false,
      operatorStatus: 'idle',
      startedAt: new Date().toISOString(),
      notified: false,
      lastOperatorMessageAt: null,
    });
  }
  return sessions.get(sessionId);
};

const getPublicState = (session) => ({
  isManualMode: session.isManualMode,
  operatorStatus: session.operatorStatus,
  lastOperatorMessageAt: session.lastOperatorMessageAt,
});

const emitState = (sessionId, type = 'state', message) => {
  const session = getSession(sessionId);
  if (!session) return;
  events.emit('state', {
    type,
    sessionId,
    message,
    state: getPublicState(session),
  });
};

const updateSessionState = (sessionId, updates, eventType, eventMessage) => {
  const session = getSession(sessionId);
  if (!session) return null;
  Object.assign(session, updates);
  emitState(sessionId, eventType || 'state', eventMessage);
  return session;
};

const sendTelegramMessage = async (text, chatId = TELEGRAM_ADMIN_CHAT_ID) => {
  if (!TELEGRAM_BOT_TOKEN || !chatId) {
    return;
  }
  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        disable_web_page_preview: true,
      }),
    });
  } catch (error) {
    console.error('Telegram send failed:', error);
  }
};

const notifySessionStart = async (sessionId, metadata = {}) => {
  const session = getSession(sessionId);
  if (!session || session.notified) return;
  session.notified = true;
  const details = [];
  if (metadata.page) details.push(`Page: ${metadata.page}`);
  if (metadata.userAgent) details.push(`User Agent: ${metadata.userAgent}`);
  const detailText = details.length ? `\n${details.join('\n')}` : '';
  await sendTelegramMessage(
    `🛰️ New MoRN AI conversation started.\nSession: ${sessionId}${detailText}`
  );
};

const forwardUserMessageToTelegram = async (sessionId, message) => {
  await sendTelegramMessage(
    `👤 User message received.\nSession: ${sessionId}\nMessage: ${message}`
  );
};

const emitOperatorMessage = (sessionId, text) => {
  const session = getSession(sessionId);
  if (!session) return;
  const time = new Date().toISOString();
  session.messages.push({ role: 'assistant', content: text });
  session.lastOperatorMessageAt = time;
  events.emit('message', {
    type: 'message',
    sessionId,
    message: {
      text,
      sender: 'operator',
      time,
    },
  });
};

const handleTelegramChat = async (chatId, text) => {
  const sessionId = `tg-${chatId}`;
  const session = getSession(sessionId);
  session.messages.push({ role: 'user', content: text });
  try {
    const response = await generateResponse(session, text);
    if (response.reply) {
      session.messages.push({ role: 'assistant', content: response.reply });
    }
    const replyText =
      response.reply || '⚠️ Sorry, I could not generate a response right now.';
    await sendTelegramMessage(replyText, chatId);
  } catch (error) {
    console.error('Telegram chat error:', error);
    await sendTelegramMessage('⚠️ Sorry, something went wrong generating a reply.', chatId);
  }
};

const queryChroma = async (query) => {
  if (!CHROMA_URL) return null;
  const url = `${CHROMA_URL.replace(/\/$/, '')}/api/v1/collections/${CHROMA_COLLECTION}/query`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query_texts: [query],
      n_results: RAG_TOP_K,
      include: ['documents', 'metadatas', 'distances'],
    }),
  });
  if (!response.ok) {
    throw new Error(`Chroma query failed: ${response.status}`);
  }
  return response.json();
};

const retrieveRagContext = async (query) => {
  try {
    const results = await queryChroma(query);
    if (!results || !results.documents || !results.documents[0]) {
      return { context: '', citations: [] };
    }
    const documents = results.documents[0];
    const metadatas = results.metadatas ? results.metadatas[0] : [];
    const citations = documents.map((doc, index) => ({
      index: index + 1,
      source: metadatas[index]?.source || 'Knowledge Vault',
      page: metadatas[index]?.page ?? null,
    }));
    const context = documents
      .map((doc, index) => {
        const meta = citations[index];
        const page = meta.page !== null ? ` (page ${meta.page})` : '';
        return `[${meta.index}] ${doc}\nSource: ${meta.source}${page}`;
      })
      .join('\n\n');
    return { context, citations };
  } catch (error) {
    console.error('RAG retrieval error:', error);
    return { context: '', citations: [] };
  }
};

const buildMessages = (session, message, ragContext) => {
  const systemLines = [
    SYSTEM_PROMPT,
    'You must follow the Sovereign Architect persona and provide strategic, narrative-driven answers.',
  ];
  if (ragContext) {
    systemLines.push(
      'Ground your response in the provided Knowledge Vault context and cite sources using [n] brackets.'
    );
  }
  const systemPrompt = systemLines.join('\n\n');
  const history = session.messages
    .filter((entry) => entry.role === 'user' || entry.role === 'assistant')
    .slice(-MAX_HISTORY);
  const messages = [{ role: 'system', content: systemPrompt }];
  messages.push(...history);
  if (ragContext) {
    messages.push({ role: 'user', content: `Knowledge Vault Context:\n${ragContext}` });
  }
  messages.push({ role: 'user', content: message });
  return messages;
};

const callOpenAI = async (messages) => {
  if (!OPENAI_API_KEY) return null;
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      messages,
      temperature: 0.4,
      max_tokens: 800,
    }),
  });
  if (!response.ok) {
    throw new Error(`OpenAI error: ${response.status}`);
  }
  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim() || null;
};

const callAnthropic = async (messages) => {
  if (!ANTHROPIC_API_KEY) return null;
  const system = messages.find((msg) => msg.role === 'system')?.content || '';
  const userMessages = messages.filter((msg) => msg.role !== 'system');
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: ANTHROPIC_MODEL,
      max_tokens: 800,
      temperature: 0.4,
      system,
      messages: userMessages,
    }),
  });
  if (!response.ok) {
    throw new Error(`Anthropic error: ${response.status}`);
  }
  const data = await response.json();
  return data.content?.[0]?.text?.trim() || null;
};

const generateResponse = async (session, message) => {
  const { context, citations } = await retrieveRagContext(message);
  const messages = buildMessages(session, message, context);
  let reply = null;
  if (LLM_PROVIDER === 'anthropic') {
    reply = await callAnthropic(messages);
  } else {
    reply = await callOpenAI(messages);
  }
  if (!reply) {
    return { reply: null, citations: [] };
  }
  const citationFooter = citations.length
    ? `\n\nSources:\n${citations
        .map((item) => {
          const page = item.page !== null ? ` (page ${item.page})` : '';
          return `[${item.index}] ${item.source}${page}`;
        })
        .join('\n')}`
    : '';
  return { reply: `${reply}${citationFooter}`, citations };
};

const isManualOverride = (session) =>
  session.isManualMode || session.operatorStatus === 'typing';

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/state', (req, res) => {
  const session = getSession(req.query.sessionId);
  if (!session) {
    return res.status(400).json({ error: 'sessionId is required' });
  }
  res.json({ state: getPublicState(session) });
});

app.post('/api/session/start', async (req, res) => {
  const sessionId = req.body?.sessionId;
  if (!sessionId) {
    return res.status(400).json({ error: 'sessionId is required' });
  }
  const session = getSession(sessionId);
  await notifySessionStart(sessionId, req.body?.metadata || {});
  res.json({ state: getPublicState(session) });
});

app.get('/api/events', (req, res) => {
  const sessionId = req.query.sessionId;
  if (!sessionId) {
    return res.status(400).json({ error: 'sessionId is required' });
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const send = (payload) => {
    res.write(`data: ${JSON.stringify(payload)}\n\n`);
  };

  const session = getSession(sessionId);
  send({ type: 'state', sessionId, state: getPublicState(session) });

  const handleState = (payload) => {
    if (payload.sessionId === sessionId) {
      send(payload);
    }
  };
  const handleMessage = (payload) => {
    if (payload.sessionId === sessionId) {
      send(payload);
    }
  };

  events.on('state', handleState);
  events.on('message', handleMessage);

  req.on('close', () => {
    events.off('state', handleState);
    events.off('message', handleMessage);
  });
});

app.post('/api/chat', async (req, res) => {
  const { sessionId, message, metadata } = req.body || {};
  if (!sessionId || !message) {
    return res.status(400).json({ error: 'sessionId and message are required' });
  }

  const session = getSession(sessionId);
  session.messages.push({ role: 'user', content: message });

  await notifySessionStart(sessionId, metadata || {});

  if (isManualOverride(session)) {
    await forwardUserMessageToTelegram(sessionId, message);
    return res.json({
      reply: null,
      manual: true,
      state: getPublicState(session),
    });
  }

  try {
    const response = await generateResponse(session, message);
    if (response.reply) {
      session.messages.push({ role: 'assistant', content: response.reply });
    }
    return res.json({
      reply: response.reply,
      citations: response.citations,
      manual: false,
      state: getPublicState(session),
    });
  } catch (error) {
    console.error('LLM error:', error);
    return res.status(500).json({
      error: 'LLM request failed',
      manual: false,
      state: getPublicState(session),
    });
  }
});

app.post('/api/telegram/webhook', async (req, res) => {
  const update = req.body;
  const message = update?.message;
  if (!message || !message.text) {
    return res.json({ ok: true });
  }

  const chatId = message.chat?.id;
  if (!chatId) {
    return res.json({ ok: true });
  }
  const isAdmin = TELEGRAM_ADMIN_CHAT_ID && String(chatId) === TELEGRAM_ADMIN_CHAT_ID;
  const text = message.text.trim();
  const isCommand = text.startsWith('/');
  const [command, sessionId, ...rest] = text.split(' ');
  const payload = rest.join(' ').trim();
  const ensureSession = async (usage) => {
    if (sessionId) return true;
    await sendTelegramMessage(`⚠️ Usage: ${usage}`, chatId);
    return false;
  };

  if (isCommand && command === '/start') {
    await sendTelegramMessage(
      'Welcome to MoRN AI! Send any message to chat. Use /help for commands.',
      chatId
    );
    return res.json({ ok: true });
  }

  if (isCommand && command === '/help') {
    const lines = [
      'MoRN AI is ready. Send any message to chat.',
      isAdmin ? 'Operator Commands:' : 'Operator commands are admin-only.',
    ];
    if (isAdmin) {
      lines.push(
        '/manual_on <sessionId>',
        '/manual_off <sessionId>',
        '/typing <sessionId> on|off',
        '/reply <sessionId> <message>',
        '/status <sessionId>'
      );
    }
    await sendTelegramMessage(lines.join('\n'), chatId);
    return res.json({ ok: true });
  }

  const adminCommands = new Set([
    '/manual_on',
    '/manual_off',
    '/typing',
    '/reply',
    '/status',
  ]);

  if (isCommand && adminCommands.has(command) && !isAdmin) {
    await sendTelegramMessage('⚠️ Operator commands are only available to the admin.', chatId);
    return res.json({ ok: true });
  }

  if (isCommand && adminCommands.has(command) && !TELEGRAM_ADMIN_CHAT_ID) {
    await sendTelegramMessage(
      '⚠️ TELEGRAM_ADMIN_CHAT_ID is not configured on the backend.',
      chatId
    );
    return res.json({ ok: true });
  }

  if (command === '/manual_on') {
    if (!(await ensureSession('/manual_on <sessionId>'))) return res.json({ ok: true });
    updateSessionState(
      sessionId,
      { isManualMode: true, operatorStatus: 'active' },
      'handover',
      HANDOVER_MESSAGE
    );
    await sendTelegramMessage(`✅ Manual mode enabled for ${sessionId}.`, chatId);
    return res.json({ ok: true });
  }

  if (command === '/manual_off') {
    if (!(await ensureSession('/manual_off <sessionId>'))) return res.json({ ok: true });
    updateSessionState(
      sessionId,
      { isManualMode: false, operatorStatus: 'idle' },
      'handover',
      RETURN_MESSAGE
    );
    await sendTelegramMessage(`✅ Manual mode disabled for ${sessionId}.`, chatId);
    return res.json({ ok: true });
  }

  if (command === '/typing') {
    if (!(await ensureSession('/typing <sessionId> on|off'))) return res.json({ ok: true });
    const session = getSession(sessionId);
    const nextStatus =
      payload === 'on' ? 'typing' : session.isManualMode ? 'active' : 'idle';
    updateSessionState(sessionId, { operatorStatus: nextStatus });
    await sendTelegramMessage(`✍️ Operator status set to ${nextStatus} for ${sessionId}.`, chatId);
    return res.json({ ok: true });
  }

  if (command === '/reply') {
    if (!(await ensureSession('/reply <sessionId> <message>'))) return res.json({ ok: true });
    if (!payload) {
      await sendTelegramMessage('⚠️ Usage: /reply <sessionId> <message>', chatId);
      return res.json({ ok: true });
    }
    emitOperatorMessage(sessionId, payload);
    await sendTelegramMessage(`📨 Delivered reply to ${sessionId}.`, chatId);
    return res.json({ ok: true });
  }

  if (command === '/status') {
    if (!(await ensureSession('/status <sessionId>'))) return res.json({ ok: true });
    const session = getSession(sessionId);
    if (!session) {
      await sendTelegramMessage('⚠️ Session not found.', chatId);
    } else {
      await sendTelegramMessage(
        `Session ${sessionId} status:\nManual: ${session.isManualMode}\nOperator: ${session.operatorStatus}`,
        chatId
      );
    }
    return res.json({ ok: true });
  }

  if (isCommand) {
    await sendTelegramMessage('⚠️ Unknown command. Use /help for available commands.', chatId);
    return res.json({ ok: true });
  }

  await handleTelegramChat(chatId, text);
  return res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`MoRN AI backend listening on port ${PORT}`);
});
