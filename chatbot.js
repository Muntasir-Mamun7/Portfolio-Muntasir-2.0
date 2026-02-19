// ===== AI CHATBOT FUNCTIONALITY =====

const MOBILE_BREAKPOINT = 600;

class AIChatbot {
  constructor() {
    this.messages = [];
    this.isOpen = false;
    this.isTyping = false;
    this.knowledgeBase = this.initializeKnowledgeBase();
    this._viewportResizeHandler = null;
    // Note: Future enhancement could integrate with AI APIs like Hugging Face
    this.init();
  }

  initializeKnowledgeBase() {
    return {
      personal: {
        name: "Muntasir Al Mamun",
        location: "Nanjing, Jiangsu, China",
        origin: "Bangladesh",
        university: "Nanjing University of Posts and Telecommunications",
        degree: "B.Sc. Computer Science",
        email: "munmamun9@gmail.com",
        linkedin: "https://www.linkedin.com/in/muntasir-mamun-2769a821b/",
        github: "https://github.com/Muntasir-Mamun7",
        facebook: "https://www.facebook.com/muntasir.mamun",
        instagram: "https://www.instagram.com/muntasir_mamun",
        experience: "2+ years in Software Development",
        projectsPage: "https://muntasir-mamun7.github.io/Portfolio-Muntasir-2.0/projects.html"
      },
      skills: {
        languages: ["Java", "Python", "JavaScript", "C", "C++", "SQL", "HTML/CSS"],
        frameworks: ["React", "Node.js", "Express", "Spring Boot", "Django"],
        databases: ["MySQL", "MongoDB", "PostgreSQL"],
        tools: ["Git", "GitHub", "VS Code", "IntelliJ IDEA", "Docker"],
        expertise: ["Web Development", "Software Engineering", "Problem Solving", "Data Structures & Algorithms"]
      },
      projects: [
        {
          name: "Baymax 2.3",
          description: "A modern, responsive web application with interactive elements and smooth animations",
          technologies: ["HTML", "CSS", "JavaScript", "React"]
        },
        {
          name: "Portfolio Website",
          description: "Personal portfolio showcasing projects, skills, and professional experience",
          technologies: ["HTML", "CSS", "JavaScript"]
        }
      ],
      interests: [
        "Software Development",
        "Web Technologies",
        "Artificial Intelligence",
        "Problem Solving",
        "Continuous Learning",
        "Technology Innovation"
      ]
    };
  }

  init() {
    this.createChatbotUI();
    this.attachEventListeners();
    this.showWelcomeMessage();
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
            <p>Online <span class="chatbot-status"></span></p>
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

  toggleChatbot() {
    this.isOpen = !this.isOpen;
    const window = document.getElementById('chatbot-window');
    const toggleBtn = document.getElementById('chatbot-toggle');
    
    if (this.isOpen) {
      window.classList.add('active');
      toggleBtn.classList.add('active');
      document.getElementById('chatbot-input').focus();
    } else {
      window.classList.remove('active');
      toggleBtn.classList.remove('active');
      window.style.height = ''; // Reset any JS-set height from keyboard handling
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

    // Show typing indicator
    this.showTypingIndicator();

    // Get response
    const response = await this.getResponse(message);
    
    // Remove typing indicator and show response
    this.hideTypingIndicator();
    this.addMessage(response, 'bot');
  }

  async getResponse(message) {
    const lowerMessage = message.toLowerCase();

    // Check knowledge base first
    const localResponse = this.getLocalResponse(lowerMessage);
    if (localResponse) {
      return localResponse;
    }

    // Try AI API for general questions
    try {
      const aiResponse = await this.getAIResponse(message);
      if (aiResponse) {
        return aiResponse;
      }
    } catch (error) {
      console.error('AI API Error:', error);
    }

    // Fallback response
    return this.getFallbackResponse(lowerMessage);
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

    // US President
    const isUSQuery = message.includes('usa') || /\bus\b/.test(message) || 
                     message.includes('america') || message.includes('united states');
    if ((message.includes('president') || message.includes('potus')) && isUSQuery) {
      return `As of 2024, Joe Biden is the President of the United States (the 46th president). However, please verify with current sources as this information may change.`;
    }

    // General greetings with name
    if (message.includes('your name') || message.includes('who are you')) {
      return `I'm MoRN, Muntasir's AI assistant! I'm here to help answer questions about Muntasir's background, skills, projects, and general knowledge. How can I help you today?`;
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
      response += `\nFeel free to connect and follow!`;
      return response;
    }

    // Contact - updated to include social media
    if (message.includes('contact') || message.includes('email') || message.includes('reach') || message.includes('linkedin') || message.includes('github')) {
      return `You can connect with ${kb.personal.name} through:\n\n**Email:** ${kb.personal.email}\n**LinkedIn:** ${kb.personal.linkedin}\n**GitHub:** ${kb.personal.github}\n**Facebook:** ${kb.personal.facebook}\n**Instagram:** ${kb.personal.instagram}\n\nFeel free to reach out for collaborations or opportunities!`;
    }

    // About Muntasir
    if (message.includes('who') || message.includes('about') || message.includes('introduce')) {
      return `I'm ${kb.personal.name}, a passionate Computer Science student from ${kb.personal.origin}, currently pursuing my degree at ${kb.personal.university} in ${kb.personal.location}. I have ${kb.personal.experience} and specialize in web development and software engineering.`;
    }

    // Location - check after more specific keywords
    if (message.includes('where') || message.includes('location') || message.includes('live')) {
      return `${kb.personal.name} is currently located in ${kb.personal.location}, studying at ${kb.personal.university}. He originally comes from ${kb.personal.origin}.`;
    }

    // Education
    if (message.includes('education') || message.includes('university') || message.includes('study') || message.includes('degree')) {
      return `${kb.personal.name} is pursuing a ${kb.personal.degree} at ${kb.personal.university} in China. He's passionate about computer science and software development.`;
    }

    // Skills
    if (message.includes('skill') || message.includes('technology') || message.includes('tech stack') || message.includes('programming')) {
      const languages = kb.skills.languages.join(', ');
      const frameworks = kb.skills.frameworks.join(', ');
      return `${kb.personal.name} has expertise in multiple technologies:\n\n**Programming Languages:** ${languages}\n\n**Frameworks & Tools:** ${frameworks}\n\nHe specializes in ${kb.skills.expertise.join(', ')}.`;
    }

    // Experience
    if (message.includes('experience') || message.includes('years')) {
      return `${kb.personal.name} has ${kb.personal.experience}. He has worked on various web development and software engineering projects, gaining hands-on experience with modern technologies and frameworks.`;
    }

    // Languages - programming
    if (message.includes('language') && !message.includes('speak')) {
      return `${kb.personal.name} is proficient in: ${kb.skills.languages.join(', ')}. He's always learning new programming languages and technologies!`;
    }

    // Interests
    if (message.includes('interest') || message.includes('hobby') || message.includes('passion')) {
      return `${kb.personal.name}'s interests include: ${kb.interests.join(', ')}. He's particularly passionate about creating innovative solutions and staying updated with the latest technology trends.`;
    }

    return null;
  }

  async getAIResponse(message) {
    // Try to search the internet for general knowledge questions
    if (this.shouldSearchInternet(message)) {
      try {
        const searchResult = await this.searchInternet(message);
        if (searchResult) {
          return searchResult;
        }
      } catch (error) {
        console.error('Internet search error:', error);
      }
    }
    
    return null;
  }

  shouldSearchInternet(message) {
    // Keywords that suggest a general knowledge question
    const generalKeywords = [
      'what is', 'who is', 'how to', 'why', 'when', 
      'define', 'explain', 'tell me about',
      'how does', 'what are', 'where is'
    ];
    
    const lowerMessage = message.toLowerCase();
    
    // Don't search if question is about Muntasir
    const personalKeywords = ['muntasir', 'you', 'your', 'portfolio', 'resume'];
    if (personalKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return false;
    }
    
    // Check if question matches general knowledge patterns
    return generalKeywords.some(keyword => lowerMessage.includes(keyword));
  }

  async searchInternet(query) {
    // Use Wikipedia API for general knowledge questions
    try {
      const searchTerm = this.extractSearchTerm(query);
      const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(searchTerm)}`;
      
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        if (data.extract) {
          return `Based on available information:\n\n${data.extract}\n\n_Source: Wikipedia_`;
        }
      }
    } catch (error) {
      console.error('Wikipedia search failed:', error);
    }
    
    return null;
  }

  extractSearchTerm(query) {
    // Remove question words to get the main topic
    let term = query.toLowerCase()
      .replace(/^(what is|who is|tell me about|explain|define|how to|why|when|where is|what are|how does)\s+/i, '')
      .replace(/\?$/, '')
      .trim();
    
    return term;
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

  addMessage(text, sender) {
    const messagesContainer = document.getElementById('chatbot-messages');
    
    // Remove welcome message if exists
    const welcomeMsg = messagesContainer.querySelector('.welcome-message');
    if (welcomeMsg) {
      welcomeMsg.remove();
    }

    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const time = new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });

    const avatar = sender === 'bot' ? '<i class="bi bi-robot"></i>' : '<i class="bi bi-person-fill"></i>';
    
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
    // Convert **bold** to <strong>
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Convert URLs to links
    text = text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');
    
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

// Initialize chatbot when DOM is ready
let chatbot;
document.addEventListener('DOMContentLoaded', () => {
  chatbot = new AIChatbot();
  console.log('%cAI Chatbot initialized!', 'color: #667eea; font-size: 14px; font-weight: bold;');
});
