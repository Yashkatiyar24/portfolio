/**
 * Intelligent Chatbot System - Integrated into Main Search
 * Combines rule-based keyword routing with LLM-style responses
 * @author Yash Katiyar
 */

class PortfolioChatbot {
    constructor() {
        this.isProcessing = false;
        this.projectsData = window.projectsData || [];
        
        // Keyword patterns for intelligent routing
        this.patterns = {
            girlfriend: {
                keywords: ['girlfriend', 'gf', 'partner', 'dating', 'relationship', 'wife', 'married', 'love life', 'significant other'],
                response: "Her name is Sonakshiii and I love her so much ❤️",
                priority: 1, // Highest priority - override everything
                action: null // No navigation action - JUST SHOW RESPONSE
            },
            about: {
                keywords: ['tell me about yourself', 'introduce yourself', 'your background', 'about yash katiyar'],
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
                    "Hey there! 👋 Ask me about my projects, skills, or background!",
                    "Hello! 👋 Want to know about my work? Just ask!",
                    "Hi! 👋 I can show you my projects, skills, and more!"
                ]
            },
            thanks: {
                keywords: ['thanks', 'thank you', 'appreciate', 'awesome', 'great'],
                responses: [
                    "You're welcome! 😊 Anything else you'd like to know?",
                    "Happy to help! 🙌 Feel free to ask more!",
                    "Glad I could help! ✨ What else can I show you?"
                ]
            },
            help: {
                keywords: ['help', 'what can you do', 'commands', 'how to use'],
                responses: [
                    "Try asking about:\n• Projects (e.g., 'Show me Salasar project')\n• Skills and technologies\n• Education and background\n• Contact information"
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
        if (this.isProcessing) return;

        const normalizedMessage = message.toLowerCase().trim();
        
        // Show processing state
        this.isProcessing = true;
        this.showProcessing();

        // Small delay for better UX
        await new Promise(resolve => setTimeout(resolve, 300));

        // ===== PRIORITY 1: GIRLFRIEND QUERY (ABSOLUTE HIGHEST PRIORITY) =====
        // Check this FIRST before anything else
        const girlfriendMatch = this.checkGirlfriendQuery(normalizedMessage);
        if (girlfriendMatch) {
            console.log('✅ Girlfriend match found - showing response only');
            this.showResponse(girlfriendMatch.response);
            this.isProcessing = false;
            return; // EXIT IMMEDIATELY - don't check anything else
        }

        // Priority 2: Check project-specific keywords
        const projectMatch = this.checkProjectKeywords(normalizedMessage);
        if (projectMatch) {
            this.showResponse(projectMatch.response);
            this.executeAction(projectMatch);
            this.isProcessing = false;
            return;
        }

        // Priority 3: Check section navigation keywords
        const sectionMatch = this.checkSectionKeywords(normalizedMessage);
        if (sectionMatch) {
            this.showResponse(sectionMatch.response);
            this.executeAction(sectionMatch);
            this.isProcessing = false;
            return;
        }

        // Priority 4: Check fallback responses (greetings, thanks, help)
        const fallbackMatch = this.checkFallbackResponses(normalizedMessage);
        if (fallbackMatch) {
            this.showResponse(fallbackMatch);
            this.isProcessing = false;
            return;
        }

        // Priority 5: Default intelligent response
        const defaultResponse = this.generateIntelligentResponse(normalizedMessage);
        this.showResponse(defaultResponse);
        this.isProcessing = false;
    }

    /**
     * Check for girlfriend-related queries (ABSOLUTE HIGHEST PRIORITY)
     * Uses strict word boundary matching
     */
    checkGirlfriendQuery(message) {
        const pattern = this.patterns.girlfriend;
        
        // Check each keyword with word boundaries
        const hasMatch = pattern.keywords.some(keyword => {
            // For multi-word keywords, use exact phrase matching
            if (keyword.includes(' ')) {
                return message.includes(keyword);
            }
            // For single words, use word boundary
            const regex = new RegExp(`\\b${keyword}\\b`, 'i');
            return regex.test(message);
        });
        
        if (hasMatch) {
            console.log('🎯 Girlfriend keyword matched:', message);
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
     * CRITICAL: This must NOT match girlfriend queries
     */
    checkSectionKeywords(message) {
        for (const [key, pattern] of Object.entries(this.patterns)) {
            // SKIP girlfriend pattern - it's handled separately with highest priority
            if (key === 'girlfriend') continue;
            
            // SKIP if pattern has no action
            if (!pattern.action) continue;
            
            // Use EXACT phrase matching for multi-word keywords
            // This prevents "who is your girlfriend" from matching "who are you"
            const hasMatch = pattern.keywords.some(keyword => {
                // For multi-word phrases, require exact match
                if (keyword.includes(' ')) {
                    return message.includes(keyword);
                }
                // For single words, use word boundary
                const regex = new RegExp(`\\b${keyword}\\b`, 'i');
                return regex.test(message);
            });

            if (hasMatch) {
                console.log('📍 Section match:', key, message);
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
            const hasMatch = pattern.keywords.some(keyword => {
                const regex = new RegExp(`\\b${keyword}\\b`, 'i');
                return regex.test(message);
            });
            
            if (hasMatch) {
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
            return "That's a great question! Explore my portfolio to learn more. Try asking about my projects, skills, or background! 🚀";
        }

        // Default response
        return "I can help you explore my portfolio! Try asking about:\n• Projects & Work\n• Skills & Technologies\n• Education\n• Contact Info";
    }

    /**
     * Execute navigation action
     * IMPORTANT: Only execute if action exists (girlfriend pattern has action: null)
     */
    executeAction(pattern) {
        // Safety check - only execute if action exists
        if (!pattern.action) {
            console.log('⚠️ No action to execute');
            return;
        }
        
        console.log('🚀 Executing action:', pattern.action);
        
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
        const routeMap = {
            'meSection': '/me',
            'projectsSection': '/projects',
            'skillsSection': '/skills',
            'educationSection': '/education',
            'contactSection': '/contact'
        };
        
        const route = routeMap[sectionId];
        if (route && window.router) {
            window.router.navigate(route);
            // Highlight after navigation
            setTimeout(() => {
                const section = document.getElementById(sectionId);
                if (section) this.highlightElement(section);
            }, 400);
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
     * Show processing state
     */
    showProcessing() {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.placeholder = 'Processing...';
            searchInput.disabled = true;
        }
    }

    /**
     * Show response as notification
     */
    showResponse(message) {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.placeholder = 'Ask me anything...';
            searchInput.disabled = false;
        }

        // Create notification
        this.showNotification(message);
    }

    /**
     * Show notification toast
     */
    showNotification(message) {
        // Remove existing notification
        const existing = document.querySelector('.chatbot-notification');
        if (existing) {
            existing.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'chatbot-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-robot"></i>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => notification.classList.add('show'), 10);

        // Hide after 4 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }
}

// Initialize chatbot
let portfolioChatbot;

document.addEventListener('DOMContentLoaded', () => {
    portfolioChatbot = new PortfolioChatbot();
    
    // Setup main search input handler
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    if (searchInput && searchBtn) {
        const handleSend = () => {
            const message = searchInput.value.trim();
            if (message && portfolioChatbot) {
                console.log('📨 User message:', message);
                portfolioChatbot.handleUserMessage(message);
                searchInput.value = '';
            }
        };

        searchBtn.addEventListener('click', handleSend);
        searchInput.addEventListener('keypress', (e) => {
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
