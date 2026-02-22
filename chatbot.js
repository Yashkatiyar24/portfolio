/**
 * Intelligent Chatbot System
 * Combines rule-based keyword routing with LLM-style responses
 * @author Yash Katiyar
 */

class PortfolioChatbot {
    constructor() {
        this.chatHistory = [];
        this.isTyping = false;
        this.projectsData = window.projectsData || [];
        
        // Keyword patterns for intelligent routing
        this.patterns = {
            girlfriend: {
                keywords: ['girlfriend', 'gf', 'partner', 'dating', 'relationship'],
                response: "Her name is Sonakshiii and I love her so much ❤️",
                priority: 1 // Highest priority - override everything
            },
            about: {
                keywords: ['who is yash', 'about you', 'about yash', 'who are you', 'tell me about yourself', 'introduce yourself'],
                action: 'scrollToSection',
                target: 'meSection',
                response: "Let me show you more about me! 👨‍💻"
            },
            projects: {
                keywords: ['projects', 'work', 'what have you built', 'portfolio', 'your projects', 'show me your work'],
                action: 'scrollToSection',
                target: 'projectsSection',
                response: "Here are my projects! 🚀"
            },
            skills: {
                keywords: ['skills', 'technologies', 'tech stack', 'what do you know', 'expertise'],
                action: 'scrollToSection',
                target: 'skillsSection',
                response: "Check out my skills and technologies! 💻"
            },
            education: {
                keywords: ['education', 'degree', 'college', 'university', 'study'],
                action: 'scrollToSection',
                target: 'educationSection',
                response: "Here's my educational background! 🎓"
            },
            contact: {
                keywords: ['contact', 'hire', 'email', 'reach out', 'get in touch', 'linkedin'],
                action: 'scrollToSection',
                target: 'contactSection',
                response: "Let's connect! Here's how you can reach me 📧"
            }
        };

        // Project-specific patterns (dynamically generated)
        this.projectPatterns = this.generateProjectPatterns();
        
        // Fallback responses for general queries
        this.fallbackResponses = {
            greeting: {
                keywords: ['hi', 'hello', 'hey', 'greetings', 'sup', 'yo'],
                responses: [
                    "Hey there! 👋 I'm Yash's AI assistant. Ask me anything about his work, skills, or projects!",
                    "Hello! 👋 Want to know about Yash's projects or skills? Just ask!",
                    "Hi! 👋 I can help you explore Yash's portfolio. What would you like to know?"
                ]
            },
            thanks: {
                keywords: ['thanks', 'thank you', 'appreciate', 'awesome', 'great'],
                responses: [
                    "You're welcome! 😊 Anything else you'd like to know?",
                    "Happy to help! 🙌 Feel free to ask more questions!",
                    "Glad I could help! ✨ What else can I show you?"
                ]
            },
            help: {
                keywords: ['help', 'what can you do', 'commands', 'how to use'],
                responses: [
                    "I can help you navigate Yash's portfolio! Try asking about:\n• Projects (e.g., 'Show me Salasar project')\n• Skills and technologies\n• Education and background\n• Contact information\n\nJust ask naturally! 💬"
                ]
            }
        };
    }

    /**
     * Generate project-specific keyword patterns
     */
    generateProjectPatterns() {
        const patterns = {};
        
        this.projectsData.forEach((project, index) => {
            const projectName = project.title.toLowerCase();
            const keywords = [
                projectName,
                ...projectName.split(' '),
                ...(project.tags || []).map(tag => tag.toLowerCase())
            ];

            patterns[projectName] = {
                keywords: keywords,
                action: 'scrollToProject',
                projectIndex: index,
                response: `Let me show you ${project.title}! 🎯`
            };
        });

        return patterns;
    }

    /**
     * Main message handler - routes to appropriate action
     */
    async handleUserMessage(message) {
        if (this.isTyping) return;

        const normalizedMessage = message.toLowerCase().trim();
        
        // Add user message to chat
        this.addMessage(message, 'user');

        // Priority 1: Check girlfriend override (highest priority)
        const girlfriendMatch = this.checkGirlfriendQuery(normalizedMessage);
        if (girlfriendMatch) {
            await this.respondWithTyping(girlfriendMatch.response);
            return;
        }

        // Priority 2: Check project-specific keywords
        const projectMatch = this.checkProjectKeywords(normalizedMessage);
        if (projectMatch) {
            await this.respondWithTyping(projectMatch.response);
            this.executeAction(projectMatch);
            return;
        }

        // Priority 3: Check section navigation keywords
        const sectionMatch = this.checkSectionKeywords(normalizedMessage);
        if (sectionMatch) {
            await this.respondWithTyping(sectionMatch.response);
            this.executeAction(sectionMatch);
            return;
        }

        // Priority 4: Check fallback responses (greetings, thanks, help)
        const fallbackMatch = this.checkFallbackResponses(normalizedMessage);
        if (fallbackMatch) {
            await this.respondWithTyping(fallbackMatch);
            return;
        }

        // Priority 5: Default intelligent response
        const defaultResponse = this.generateIntelligentResponse(normalizedMessage);
        await this.respondWithTyping(defaultResponse);
    }

    /**
     * Check for girlfriend-related queries (highest priority)
     */
    checkGirlfriendQuery(message) {
        const pattern = this.patterns.girlfriend;
        const hasMatch = pattern.keywords.some(keyword => message.includes(keyword));
        
        if (hasMatch) {
            return pattern;
        }
        return null;
    }

    /**
     * Check for project-specific keywords
     */
    checkProjectKeywords(message) {
        for (const [projectName, pattern] of Object.entries(this.projectPatterns)) {
            const hasMatch = pattern.keywords.some(keyword => {
                // Match whole words or phrases
                const regex = new RegExp(`\\b${keyword}\\b`, 'i');
                return regex.test(message);
            });

            if (hasMatch) {
                return pattern;
            }
        }
        return null;
    }

    /**
     * Check for section navigation keywords
     */
    checkSectionKeywords(message) {
        for (const [key, pattern] of Object.entries(this.patterns)) {
            if (key === 'girlfriend') continue; // Skip girlfriend (already checked)
            
            const hasMatch = pattern.keywords.some(keyword => {
                return message.includes(keyword);
            });

            if (hasMatch) {
                return pattern;
            }
        }
        return null;
    }

    /**
     * Check fallback responses (greetings, thanks, help)
     */
    checkFallbackResponses(message) {
        for (const [key, pattern] of Object.entries(this.fallbackResponses)) {
            const hasMatch = pattern.keywords.some(keyword => message.includes(keyword));
            
            if (hasMatch) {
                // Return random response from array
                return pattern.responses[Math.floor(Math.random() * pattern.responses.length)];
            }
        }
        return null;
    }

    /**
     * Generate intelligent default response
     */
    generateIntelligentResponse(message) {
        // Check if asking about specific technologies
        const techKeywords = ['react', 'python', 'ai', 'ml', 'machine learning', 'tensorflow', 'node', 'javascript'];
        const hasTechQuery = techKeywords.some(tech => message.includes(tech));
        
        if (hasTechQuery) {
            return "Yes! I work with that technology. Check out the Skills section to see my full tech stack! 💻";
        }

        // Check if asking questions
        if (message.includes('?')) {
            return "That's a great question! You can explore different sections of my portfolio to learn more. Try asking about my projects, skills, or background! 🚀";
        }

        // Default response
        return "I'm Yash's AI assistant! 🤖 I can help you navigate through:\n• Projects & Work\n• Skills & Technologies\n• Education & Background\n• Contact Information\n\nWhat would you like to explore?";
    }

    /**
     * Execute navigation action
     */
    executeAction(pattern) {
        if (pattern.action === 'scrollToSection') {
            this.scrollToSection(pattern.target);
        } else if (pattern.action === 'scrollToProject') {
            this.scrollToProject(pattern.projectIndex);
        }
    }

    /**
     * Scroll to specific section with highlight
     */
    scrollToSection(sectionId) {
        // First, navigate to the section if not already there
        const section = document.getElementById(sectionId);
        
        if (section) {
            // Hide main view
            document.getElementById('mainView').style.display = 'none';
            
            // Hide all sections
            document.querySelectorAll('.section-view').forEach(s => {
                s.style.display = 'none';
            });
            
            // Show target section
            section.style.display = 'block';
            
            // Smooth scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Add highlight effect
            this.highlightElement(section);
        }
    }

    /**
     * Scroll to specific project in carousel
     */
    scrollToProject(projectIndex) {
        // Navigate to projects section first
        this.scrollToSection('projectsSection');
        
        // Wait for section to load, then navigate to specific project
        setTimeout(() => {
            if (window.currentProjectIndex !== undefined) {
                window.currentProjectIndex = projectIndex;
                if (typeof window.updateCarousel === 'function') {
                    window.updateCarousel();
                }
                
                // Highlight the project card
                const projectCard = document.querySelector('.project-card-large.active');
                if (projectCard) {
                    this.highlightElement(projectCard);
                }
            }
        }, 500);
    }

    /**
     * Add subtle highlight animation to element
     */
    highlightElement(element) {
        element.classList.add('chatbot-highlight');
        
        setTimeout(() => {
            element.classList.remove('chatbot-highlight');
        }, 2000);
    }

    /**
     * Add message to chat UI
     */
    addMessage(text, sender) {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}-message`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.textContent = text;
        
        messageDiv.appendChild(messageContent);
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        this.chatHistory.push({ text, sender, timestamp: Date.now() });
    }

    /**
     * Show typing indicator and respond after delay
     */
    async respondWithTyping(response) {
        this.isTyping = true;
        this.showTypingIndicator();
        
        // Simulate typing delay based on response length
        const typingDelay = Math.min(1000 + (response.length * 20), 3000);
        
        await new Promise(resolve => setTimeout(resolve, typingDelay));
        
        this.hideTypingIndicator();
        this.addMessage(response, 'bot');
        this.isTyping = false;
    }

    /**
     * Show typing indicator
     */
    showTypingIndicator() {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;

        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-message bot-message typing-indicator';
        typingDiv.id = 'typingIndicator';
        
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'typing-dots';
        
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('span');
            dot.className = 'typing-dot';
            dotsContainer.appendChild(dot);
        }
        
        typingDiv.appendChild(dotsContainer);
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    /**
     * Hide typing indicator
     */
    hideTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) {
            indicator.remove();
        }
    }

    /**
     * Clear chat history
     */
    clearChat() {
        this.chatHistory = [];
        const chatMessages = document.getElementById('chatMessages');
        if (chatMessages) {
            chatMessages.innerHTML = '';
        }
    }
}

// Initialize chatbot
let portfolioChatbot;

document.addEventListener('DOMContentLoaded', () => {
    portfolioChatbot = new PortfolioChatbot();
    
    // Setup chat input handler
    const chatInput = document.getElementById('searchInput');
    const chatButton = document.getElementById('searchBtn');
    
    if (chatInput && chatButton) {
        const handleSend = () => {
            const message = chatInput.value.trim();
            if (message) {
                portfolioChatbot.handleUserMessage(message);
                chatInput.value = '';
            }
        };

        chatButton.addEventListener('click', handleSend);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSend();
            }
        });
    }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioChatbot;
}
