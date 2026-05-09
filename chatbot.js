// ===== AI CHATBOT FUNCTIONALITY =====

const MOBILE_BREAKPOINT = 600;
const SESSION_STORAGE_KEY = 'morn-chat-session-id';
const BACKEND_META_NAME = 'morn-backend-url';

const resolveBackendUrl = () => {
  if (window.MORN_BACKEND_URL) {
    return window.MORN_BACKEND_URL.replace(/\/$/, '');
  }
  const meta = document.querySelector(`meta[name="${BACKEND_META_NAME}"]`);
  if (meta && meta.content) {
    return meta.content.replace(/\/$/, '');
  }
  return window.location.origin;
};

const createSessionId = () => {
  if (window.crypto && window.crypto.randomUUID) {
    return window.crypto.randomUUID();
  }
  return `morn-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

class AIChatbot {
  constructor() {
    this.messages = [];
    this.isOpen = false;
    this.isTyping = false;
    this.sessionId = this.getOrCreateSessionId();
    this.backendUrl = resolveBackendUrl();
    this.manualMode = false;
    this.operatorStatus = 'idle';
    this.hasNotifiedStart = false;
    this.eventSource = null;
    this.knowledgeBase = this.initializeKnowledgeBase();
    this._viewportResizeHandler = null;
    // Note: Future enhancement could integrate with AI APIs like Hugging Face
    this.init();
  }

  getOrCreateSessionId() {
    const stored = localStorage.getItem(SESSION_STORAGE_KEY);
    if (stored) return stored;
    const sessionId = createSessionId();
    localStorage.setItem(SESSION_STORAGE_KEY, sessionId);
    return sessionId;
  }

  initializeKnowledgeBase() {
    return {
      personal: {
        name: "Muntasir Al Mamun",
        location: "Nanjing, Jiangsu, China",
        origin: "Bangladesh",
        university: "Nanjing University of Posts and Telecommunications",
        degree: "B.Eng. Computer Science & Technology",
        gpa: "4.23/5.0",
        email: "munmamun9@gmail.com",
        linkedin: "https://www.linkedin.com/in/muntasirmamun7/",
        github: "https://github.com/Muntasir-Mamun7",
        orcid: "https://orcid.org/0009-0008-5640-5193",
        medium: "https://muntasirmamun7.medium.com/",
        twitter: "https://x.com/MoRN__7",
        facebook: "https://www.facebook.com/Muntasir0724/",
        instagram: "https://www.instagram.com/morn.m7/",
        experience: "2 published research papers (Springer Nature & Blockchain Journal) with active work on UAV authentication systems using Proof-of-History blockchain technology",
        projectsPage: "https://muntasir-mamun7.github.io/Portfolio-Muntasir-2.0/projects.html"
      },
      skills: {
        languages: ["Java", "Python", "JavaScript", "C", "C++", "Solidity", "HTML/CSS"],
        frameworks: ["React", "Node.js", "Web3.js", "Hardhat", "AirSim", "PX4 Autopilot"],
        databases: ["MySQL"],
        tools: ["Git", "GitHub", "VS Code", "Docker", "MetaMask", "IPFS", "Unreal Engine"],
        expertise: ["Blockchain Development", "UAV Systems", "Smart Contracts", "Spectrum Security", "Decentralized Solutions", "6G Networks"]
      },
      projects: [
        {
          name: "UAVSpectrumChain",
          description: "A blockchain-based smart contract framework for secure and credible spectrum trading among UAVs. Implements Ethereum smart contracts for trustless spectrum auctions and transparent transaction records. Published in Springer Nature, 2025.",
          technologies: ["Blockchain", "Solidity", "Hardhat", "UAV", "Ethereum"],
          link: "https://doi.org/10.1007/978-981-95-4142-3_3"
        },
        {
          name: "Baymax 2.3",
          description: "A modern, responsive web application with interactive elements and smooth animations",
          technologies: ["HTML", "CSS", "JavaScript"],
          link: "https://muntasir-mamun7.github.io/baymax-2.3/"
        },
        {
          name: "Beat Chimp - Memory Test Game",
          description: "An engaging Java-based memory testing game with progressive difficulty levels and performance tracking",
          technologies: ["Java", "Java Swing", "GUI"]
        },
        {
          name: "Baymax 2.0",
          description: "An earlier iteration of the Baymax project showcasing responsive web development skills",
          technologies: ["HTML", "CSS", "JavaScript"],
          link: "https://muntasir-mamun7.github.io/baymax-2-0/"
        },
        {
          name: "G3 Architecture",
          description: "A sleek architecture website design showcasing modern layout techniques and UI/UX design",
          technologies: ["HTML", "CSS", "Design"],
          link: "https://muntasir-mamun7.github.io/g3-arch/"
        }
      ],
      publications: [
        {
          title: "UAVSpectrumChain: Smart-Contract Based Credible Spectrum Trading for UAV Communications",
          venue: "Springer Nature, 2025",
          doi: "https://doi.org/10.1007/978-981-95-4142-3_3"
        },
        {
          title: "Blockchain-enabled Dynamic Credible Spectrum Sharing in 6G Networks",
          venue: "ELSP Blockchain Journal, 2025",
          doi: "https://doi.org/10.55092/blockchain20250014"
        }
      ],
      interests: [
        "Blockchain Technology",
        "UAV Systems & Aerial Networks",
        "Smart Contract Development",
        "Spectrum Security & 6G Networks",
        "Web Development",
        "Artificial Intelligence",
        "Continuous Learning"
      ]
    };
  }

  init() {
    this.createChatbotUI();
    this.attachEventListeners();
    this.showWelcomeMessage();
    this.updateStatusUI();
    this.connectBackend();
  }

  createChatbotUI() {
    // Create chatbot toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'chatbot-toggle';
    toggleBtn.setAttribute('aria-label', 'Toggle AI Chatbot');
    toggleBtn.innerHTML = '<i class="bi bi-robot chatbot-toggle-icon"></i>';
    toggleBtn.id = 'chatbot-toggle';

    // Create chatbot window
    const chatbotWindow = document.createElement('div');
    chatbotWindow.className = 'chatbot-window';
    chatbotWindow.id = 'chatbot-window';
    chatbotWindow.innerHTML = `
      <div class="chatbot-header">
        <div class="chatbot-header-content">
          <div class="chatbot-avatar"><i class="bi bi-robot"></i></div>
            <div class="chatbot-header-info">
              <h3>MoRN</h3>
              <p><span id="chatbot-status-text">Online</span> <span class="chatbot-status" id="chatbot-status-dot"></span></p>
            </div>
        </div>
        <button class="chatbot-close" aria-label="Close chatbot">×</button>
      </div>
      <div class="chatbot-messages" id="chatbot-messages"></div>
      <div class="quick-actions" id="quick-actions"></div>
      <div class="chatbot-input-container">
        <input 
          type="text" 
          class="chatbot-input" 
          id="chatbot-input" 
          placeholder="Ask me anything about Muntasir..."
          autocomplete="off"
        />
        <button class="chatbot-send-btn" id="chatbot-send-btn" aria-label="Send message">
          ➤
        </button>
      </div>
    `;

    document.body.appendChild(toggleBtn);
    document.body.appendChild(chatbotWindow);
  }

  attachEventListeners() {
    const toggleBtn = document.getElementById('chatbot-toggle');
    const closeBtn = document.querySelector('.chatbot-close');
    const sendBtn = document.getElementById('chatbot-send-btn');
    const input = document.getElementById('chatbot-input');

    toggleBtn.addEventListener('click', () => this.toggleChatbot());
    closeBtn.addEventListener('click', () => this.toggleChatbot());
    sendBtn.addEventListener('click', () => this.sendMessage());
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });

    // Handle virtual keyboard on mobile: resize chatbot window so input stays visible
    if (window.visualViewport) {
      this._viewportResizeHandler = () => {
        const chatWindow = document.getElementById('chatbot-window');
        if (chatWindow && chatWindow.classList.contains('active') && window.innerWidth <= MOBILE_BREAKPOINT) {
          chatWindow.style.height = window.visualViewport.height + 'px';
        }
      };
      window.visualViewport.addEventListener('resize', this._viewportResizeHandler);
    }
  }

  connectBackend() {
    this.fetchState();
    this.connectEventSource();
  }

  async fetchState() {
    try {
      const response = await fetch(`${this.backendUrl}/api/state?sessionId=${encodeURIComponent(this.sessionId)}`);
      if (response.ok) {
        const data = await response.json();
        this.applyState(data.state);
      }
    } catch (error) {
      console.warn('Backend state unavailable:', error);
    }
  }

  connectEventSource() {
    if (this.eventSource) return;
    try {
      const url = `${this.backendUrl}/api/events?sessionId=${encodeURIComponent(this.sessionId)}`;
      const source = new EventSource(url);
      source.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          this.handleEventPayload(payload);
        } catch (error) {
          console.warn('Invalid SSE payload:', error);
        }
      };
      source.onerror = () => {
        source.close();
        this.eventSource = null;
        setTimeout(() => this.connectEventSource(), 3000);
      };
      this.eventSource = source;
    } catch (error) {
      console.warn('Event source unavailable:', error);
    }
  }

  handleEventPayload(payload) {
    if (!payload) return;
    if (payload.type === 'state' || payload.type === 'handover') {
      this.applyState(payload.state);
      if (payload.type === 'handover' && payload.message) {
        this.addMessage(payload.message, 'bot', { variant: 'system' });
      }
    }
    if (payload.type === 'message' && payload.message) {
      this.addMessage(payload.message.text, 'bot', { variant: 'operator' });
    }
  }

  applyState(state) {
    if (!state) return;
    this.manualMode = Boolean(state.isManualMode);
    this.operatorStatus = state.operatorStatus || 'idle';
    this.updateStatusUI();
    if (this.manualMode && this.isTyping) {
      this.hideTypingIndicator();
    }
  }

  updateStatusUI() {
    const statusText = document.getElementById('chatbot-status-text');
    const statusDot = document.getElementById('chatbot-status-dot');
    if (!statusText || !statusDot) return;
    statusDot.classList.remove('is-idle', 'is-manual', 'is-typing');
    if (this.operatorStatus === 'typing') {
      statusText.textContent = 'Operator typing';
      statusDot.classList.add('is-typing');
      return;
    }
    if (this.manualMode) {
      statusText.textContent = 'Operator active';
      statusDot.classList.add('is-manual');
      return;
    }
    statusText.textContent = 'Online';
    statusDot.classList.add('is-idle');
  }

  async notifySessionStart() {
    if (this.hasNotifiedStart) return;
    this.hasNotifiedStart = true;
    try {
      await fetch(`${this.backendUrl}/api/session/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: this.sessionId,
          metadata: {
            page: window.location.pathname,
            userAgent: navigator.userAgent,
          },
        }),
      });
    } catch (error) {
      console.warn('Session start notification failed:', error);
    }
  }

  toggleChatbot() {
    this.isOpen = !this.isOpen;
    const chatWindow = document.getElementById('chatbot-window');
    const toggleBtn = document.getElementById('chatbot-toggle');
    
    if (this.isOpen) {
      chatWindow.classList.add('active');
      toggleBtn.classList.add('active');
      document.getElementById('chatbot-input').focus();
      this.notifySessionStart();
    } else {
      chatWindow.classList.remove('active');
      toggleBtn.classList.remove('active');
      chatWindow.style.height = ''; // Reset any JS-set height from keyboard handling
    }
  }

  showWelcomeMessage() {
    const messagesContainer = document.getElementById('chatbot-messages');
    messagesContainer.innerHTML = `
      <div class="welcome-message">
        <div class="welcome-message-icon"><i class="bi bi-stars"></i></div>
        <h3>Hello! I'm MoRN</h3>
        <p>I'm Muntasir's AI assistant. I can answer questions about Muntasir's background, skills, projects, and general knowledge questions. Feel free to ask me anything!</p>
      </div>
    `;
    
    this.showQuickActions();
  }

  showQuickActions() {
    const quickActionsContainer = document.getElementById('quick-actions');
    const actions = [
      "Tell me about Muntasir",
      "What are his skills?",
      "Show me his projects",
      "Contact information"
    ];

    quickActionsContainer.innerHTML = actions.map((action, index) => 
      `<button class="quick-action-btn" data-action="${index}">${action}</button>`
    ).join('');
    
    // Add event listeners to quick action buttons
    quickActionsContainer.querySelectorAll('.quick-action-btn').forEach((btn, index) => {
      btn.addEventListener('click', () => this.handleQuickAction(actions[index]));
    });
  }

  handleQuickAction(action) {
    const input = document.getElementById('chatbot-input');
    input.value = action;
    this.sendMessage();
  }

  async sendMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();

    if (!message || this.isTyping) return;

    // Add user message
    this.addMessage(message, 'user');
    input.value = '';

    const expectsAI = !this.manualMode && this.operatorStatus !== 'typing';
    if (expectsAI) {
      this.showTypingIndicator();
    }

    const response = await this.getResponse(message);

    if (expectsAI) {
      this.hideTypingIndicator();
    }

    if (response?.manual) {
      return;
    }

    if (response?.reply) {
      this.addMessage(response.reply, 'bot');
    }
  }

  async getResponse(message) {
    const lowerMessage = message.toLowerCase();
    const manualOverride = this.manualMode || this.operatorStatus === 'typing';
    const backendResponse = await this.getBackendResponse(message);
    if (backendResponse) {
      this.applyState(backendResponse.state);
      if (backendResponse.manual) {
        return { manual: true };
      }
      if (backendResponse.reply) {
        return { reply: backendResponse.reply, manual: false };
      }
    }
    if (manualOverride) {
      return { manual: true };
    }

    const localResponse = this.getLocalResponse(lowerMessage);
    if (localResponse) {
      return { reply: localResponse, manual: false };
    }

    return { reply: this.getFallbackResponse(lowerMessage), manual: false };
  }

  getLocalResponse(message) {
    const kb = this.knowledgeBase;

    // Current time
    if (message.includes('time') || message.includes('what time')) {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit',
        hour12: true 
      });
      const dateString = now.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      return `The current time is ${timeString} on ${dateString}.`;
    }

    // General greetings with name
    if (message.includes('your name') || message.includes('who are you')) {
      return `I'm MoRN, Muntasir's AI assistant! I'm here to help answer questions about Muntasir's background, skills, projects, and general knowledge. How can I help you today?`;
    }

    // Publications / research papers
    if (message.includes('publication') || message.includes('paper') || message.includes('research') || message.includes('published')) {
      const pubList = kb.publications.map(p =>
        `**${p.title}**\nPublished in: ${p.venue}\nDOI: ${p.doi}`
      ).join('\n\n');
      return `${kb.personal.name} has ${kb.publications.length} published research papers:\n\n${pubList}`;
    }

    // Projects - check this before generic "where" to avoid conflict
    if (/\bproject(s)?\b/.test(message) || message.includes('work') || message.includes('built')) {
      const projectList = kb.projects.map(p => 
        `**${p.name}:** ${p.description} (Technologies: ${p.technologies.join(', ')})`
      ).join('\n\n');
      return `Here are some of ${kb.personal.name}'s notable projects:\n\n${projectList}\n\nYou can find all projects at: ${kb.personal.projectsPage}\n\nOr visit his GitHub: ${kb.personal.github}`;
    }

    // Social media links - check before generic keywords
    if (message.includes('facebook') || message.includes('instagram') || message.includes('social media')) {
      let response = `You can connect with ${kb.personal.name} on social media:\n\n`;
      if (message.includes('facebook') || message.includes('social media')) {
        response += `Facebook: ${kb.personal.facebook}\n`;
      }
      if (message.includes('instagram') || message.includes('social media')) {
        response += `Instagram: ${kb.personal.instagram}\n`;
      }
      response += `LinkedIn: ${kb.personal.linkedin}\n`;
      response += `GitHub: ${kb.personal.github}\n`;
      response += `X (Twitter): ${kb.personal.twitter}\n`;
      response += `\nFeel free to connect and follow!`;
      return response;
    }

    // Contact - updated to include social media
    if (message.includes('contact') || message.includes('email') || message.includes('reach') || message.includes('linkedin') || message.includes('github')) {
      return `You can connect with ${kb.personal.name} through:\n\n**Email:** ${kb.personal.email}\n**LinkedIn:** ${kb.personal.linkedin}\n**GitHub:** ${kb.personal.github}\n**ORCID:** ${kb.personal.orcid}\n**Medium:** ${kb.personal.medium}\n**Facebook:** ${kb.personal.facebook}\n**Instagram:** ${kb.personal.instagram}\n\nFeel free to reach out for collaborations or opportunities!`;
    }

    // About Muntasir
    if (message.includes('who') || message.includes('about') || message.includes('introduce')) {
      return `${kb.personal.name} is a passionate Computer Science & Technology researcher from ${kb.personal.origin}, currently pursuing his ${kb.personal.degree} at ${kb.personal.university} in ${kb.personal.location} (GPA: ${kb.personal.gpa}). He has ${kb.personal.experience} and specializes in blockchain technology and UAV systems.`;
    }

    // Location - check after more specific keywords
    if (message.includes('where') || message.includes('location') || message.includes('live')) {
      return `${kb.personal.name} is currently located in ${kb.personal.location}, studying at ${kb.personal.university}. He originally comes from ${kb.personal.origin}.`;
    }

    // Education
    if (message.includes('education') || message.includes('university') || message.includes('study') || message.includes('degree') || message.includes('gpa')) {
      return `${kb.personal.name} is pursuing a ${kb.personal.degree} at ${kb.personal.university} in China, with a GPA of ${kb.personal.gpa}. He's passionate about blockchain technology, UAV systems, and computer science research.`;
    }

    // Skills
    if (message.includes('skill') || message.includes('technology') || message.includes('tech stack') || message.includes('programming')) {
      const languages = kb.skills.languages.join(', ');
      const frameworks = kb.skills.frameworks.join(', ');
      return `${kb.personal.name} has expertise in multiple technologies:\n\n**Programming Languages:** ${languages}\n\n**Frameworks & Tools:** ${frameworks}\n\nHe specializes in ${kb.skills.expertise.join(', ')}.`;
    }

    // Experience
    if (message.includes('experience') || message.includes('years')) {
      return `${kb.personal.name} has ${kb.personal.experience}. He has worked on blockchain and UAV research projects, gaining hands-on experience with smart contract development, spectrum security, and decentralized systems.`;
    }

    // Languages - programming
    if (message.includes('language') && !message.includes('speak')) {
      return `${kb.personal.name} is proficient in: ${kb.skills.languages.join(', ')}. He's always learning new programming languages and technologies!`;
    }

    // Interests
    if (message.includes('interest') || message.includes('hobby') || message.includes('passion')) {
      return `${kb.personal.name}'s interests include: ${kb.interests.join(', ')}. He's particularly passionate about blockchain-enabled UAV systems and advancing decentralized solutions for next-generation aerial networks.`;
    }

    return null;
  }

  async getBackendResponse(message) {
    try {
      const response = await fetch(`${this.backendUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: this.sessionId,
          message,
          metadata: {
            page: window.location.pathname,
            userAgent: navigator.userAgent,
          },
        }),
      });
      if (!response.ok) {
        return null;
      }
      return await response.json();
    } catch (error) {
      console.warn('Backend response failed:', error);
      return null;
    }
  }

  getFallbackResponse(message) {
    // Greeting responses
    if (message.match(/^(hi|hello|hey|greetings)/)) {
      return "Hello! I'm MoRN, Muntasir's AI assistant. How can I help you today? You can ask me about his background, skills, projects, contact information, or general questions!";
    }

    // Thank you
    if (message.includes('thank')) {
      return "You're welcome! Feel free to ask if you have any other questions about Muntasir or anything else! 😊";
    }

    // Bye
    if (message.match(/^(bye|goodbye|see you)/)) {
      return "Goodbye! Feel free to come back anytime you have questions. Have a great day!";
    }

    // Help
    if (message.includes('help')) {
      return "I can help you learn about:\n\n• Muntasir's background and education\n• His technical skills and expertise\n• Projects he's worked on\n• How to contact him (email, LinkedIn, GitHub, Facebook, Instagram)\n• His experience and interests\n• General knowledge (current time, world facts, etc.)\n\nJust ask me anything!";
    }

    // Default response for unknown questions
    const responses = [
      "That's an interesting question! While I don't have specific information about that, I can tell you about Muntasir's skills, projects, education, contact information, or answer general questions. What would you like to know?",
      "I'm not sure about that specific detail, but I'd be happy to share information about Muntasir's background, skills, projects, or answer general knowledge questions. What interests you most?",
      "I might not have that exact information, but I can tell you about Muntasir's education at Nanjing University, his technical skills, project experience, or answer general questions. What would you like to explore?",
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  }

  addMessage(text, sender, options = {}) {
    const messagesContainer = document.getElementById('chatbot-messages');
    
    // Remove welcome message if exists
    const welcomeMsg = messagesContainer.querySelector('.welcome-message');
    if (welcomeMsg) {
      welcomeMsg.remove();
    }

    const messageDiv = document.createElement('div');
    const messageClasses = ['message', sender];
    if (options.variant) {
      messageClasses.push(options.variant);
    }
    messageDiv.className = messageClasses.join(' ');
    
    const time = new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });

    let avatar = sender === 'bot' ? '<i class="bi bi-robot"></i>' : '<i class="bi bi-person-fill"></i>';
    if (options.variant === 'operator') {
      avatar = '<i class="bi bi-person-badge"></i>';
    }
    if (options.variant === 'system') {
      avatar = '<i class="bi bi-info-circle"></i>';
    }
    
    // Format text with markdown-like syntax
    const formattedText = this.formatMessage(text);
    
    messageDiv.innerHTML = `
      <div class="message-avatar">${avatar}</div>
      <div class="message-content">
        <p>${formattedText}</p>
        <div class="message-time">${time}</div>
      </div>
    `;

    messagesContainer.appendChild(messageDiv);
    this.scrollToBottom();

    // Store message
    this.messages.push({ text, sender, time });
  }

  formatMessage(text) {
    // Sanitize HTML entities first to prevent XSS
    const escapeHtml = (str) => str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;');

    text = escapeHtml(text);

    // Convert **bold** to <strong> (safe: HTML already escaped above)
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Convert URLs to links (safe: HTML already escaped, URL is treated as text content)
    text = text.replace(/(https?:\/\/[^\s<>"]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
    
    // Convert email to mailto link
    text = text.replace(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/g, '<a href="mailto:$1">$1</a>');
    
    // Convert line breaks
    text = text.replace(/\n/g, '<br>');
    
    return text;
  }

  showTypingIndicator() {
    this.isTyping = true;
    const messagesContainer = document.getElementById('chatbot-messages');
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot';
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = `
      <div class="message-avatar"><i class="bi bi-robot"></i></div>
      <div class="typing-indicator">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    `;
    
    messagesContainer.appendChild(typingDiv);
    this.scrollToBottom();
  }

  hideTypingIndicator() {
    this.isTyping = false;
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }

  scrollToBottom() {
    const messagesContainer = document.getElementById('chatbot-messages');
    setTimeout(() => {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 100);
  }
}

// Initialize chatbot when DOM is ready (handles both inline and dynamic loading)
let chatbot;
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    chatbot = new AIChatbot();
    console.log('%cAI Chatbot initialized!', 'color: #667eea; font-size: 14px; font-weight: bold;');
  });
} else {
  chatbot = new AIChatbot();
  console.log('%cAI Chatbot initialized!', 'color: #667eea; font-size: 14px; font-weight: bold;');
}
