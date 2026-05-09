# MoRN AI Backend

This service powers the Hybrid Autonomous-Human Agent flow for the portfolio chatbot.

## Setup

1. Copy `.env.example` to `.env` and fill in your API keys.
   - Set `CORS_ORIGIN` to the exact frontend origin (comma-separated if multiple).
2. Add your full “Sovereign Architect” system prompt to `config/systemPrompt.txt` (or set `SYSTEM_PROMPT`).
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   npm run start
   ```

## Telegram Command Mode (Operator Control)

Configure your Telegram bot token + admin chat ID in `.env`, then set the webhook:

```
https://api.telegram.org/bot<YOUR_TOKEN>/setWebhook?url=https://<your-backend-domain>/api/telegram/webhook
```

Available commands:

- `/manual_on <sessionId>` → handover to human
- `/manual_off <sessionId>` → return to AI
- `/typing <sessionId> on|off` → operator typing signal
- `/reply <sessionId> <message>` → send human reply
- `/status <sessionId>` → current session status
- `/help` → command list

### Operator Notifications

- When `TELEGRAM_ADMIN_CHAT_ID` is set, web chat messages are forwarded to the admin chat.
- Set `TELEGRAM_FORWARD_ALL=false` to only forward messages when manual mode is enabled.

## Telegram Chat Mode (Bot Conversations)

Once the webhook is set, any non-command message sent to the bot will be answered by the MoRN AI backend.

- Each Telegram chat uses a session id of `tg-<chatId>`.
- Operator commands remain admin-only (configure `TELEGRAM_ADMIN_CHAT_ID` to use them).
- Use `/help` to see the available commands and a short usage prompt.

## RAG (Knowledge Vault)

1. Drop PDFs/Markdown files into `server/rag/data/`.
2. Install Python dependencies:
   ```bash
   python -m venv .venv
   source .venv/bin/activate
   pip install -r server/rag/requirements.txt
   ```
3. Ingest documents:
   ```bash
   python server/rag/ingest.py
   ```
4. Run Chroma locally (example):
   ```bash
   chroma run --path server/rag/chroma --host 0.0.0.0 --port 8000
   ```
5. Ensure `CHROMA_URL` in `.env` matches the running Chroma server.

## Notes

- The frontend listens to `/api/events` via Server-Sent Events (SSE) for manual mode and operator replies.
- If the backend is hosted on a different domain, set `window.MORN_BACKEND_URL = "https://your-backend"` before `chatbot.js` loads (or add a `<meta name="morn-backend-url" ...>` tag).
- The backend defaults to OpenAI unless `LLM_PROVIDER=anthropic` is set.
- LangChain or LlamaIndex can be added later if you want higher-level orchestration.
