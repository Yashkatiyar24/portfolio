// Enhanced Projects Module
class ProjectsManager {
    constructor() {
        this.currentFilter = null;
        this.filteredProjects = [];
        this.isModalOpen = false;
        
        this.init();
    }
    
    init() {
        this.renderFilterTabs();
        this.setupEventListeners();
        this.showDomainsView();
        this.createVideoModal();
    }
    
    renderFilterTabs() {
        const filterContainer = document.getElementById('projectFilters');
        if (!filterContainer) return;

        filterContainer.innerHTML = allDomains
            .filter(domain => domain !== 'All')
            .map(domain => {
            const domainInfo = domainConfig[domain] || {};
            const domainIcon = domainInfo.icon || 'fas fa-folder-open';
            const domainLabel = domainInfo.label || domain;
            const count = projectsData.filter(project => project.domain === domain).length;

            return `
            <button class="domain-card ${domain === this.currentFilter ? 'active' : ''}" 
                    data-domain="${domain}">
                <span class="domain-card-icon"><i class="${domainIcon}"></i></span>
                <span class="domain-card-title">${domainLabel}</span>
                <span class="domain-card-meta">${count} project${count > 1 ? 's' : ''}</span>
            </button>
        `;
        }).join('');
    }
    
    renderProjects() {
        const carousel = document.querySelector('.projects-carousel');
        if (!carousel) return;
        
        carousel.innerHTML = this.filteredProjects.map((project, index) => {
            const categoryStyle = categoryConfig[project.category] || categoryConfig['AI System'];
            const hasGithub = Boolean(project.githubUrl && project.githubUrl.includes('github.com'));
            
            // Determine if project has demo (either video or live link)
            const hasDemo = project.demoVideo || project.liveDemo;
            const demoButtonText = project.liveDemo ? 'Try Live Demo' : 'Watch Demo';
            const demoIcon = project.liveDemo ? 'fas fa-external-link-alt' : 'fas fa-play-circle';
            
            return `
                 <div class="project-card-large" 
                     data-index="${index}"
                     data-project-id="${project.id}"
                     data-domain="${project.domain}">
                    <h3>${project.title}</h3>
                    <div class="project-preview ${project.image ? 'project-screenshot' : ''}">
                        ${project.image 
                            ? `<img src="${project.image}" alt="${project.title}" loading="lazy" class="${project.imageFit === 'cover' ? 'image-fit-cover' : ''}">` 
                            : `<div class="project-icon"><i class="${project.icon}"></i></div>`
                        }
                    </div>
                    <p class="project-desc">${project.description}</p>
                    <div class="project-tech-tags">
                        ${project.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                    <div class="project-actions">
                        ${hasGithub ? `
                        <a href="${project.githubUrl}" target="_blank" class="project-link">
                            <i class="fab fa-github"></i> View on GitHub
                        </a>
                        ` : ''}
                        ${hasDemo ? `
                            <button class="project-demo-btn" data-project-id="${project.id}">
                                <i class="${demoIcon}"></i> ${demoButtonText}
                            </button>
                        ` : ''}
                    </div>
                </div>
            `;
        }).join('');
        
        // Re-attach event listeners for demo buttons
        this.attachDemoButtonListeners();
        this.attachProjectCardListeners();
    }

    attachProjectCardListeners() {
        const cards = document.querySelectorAll('.project-card-large');
        cards.forEach(card => {
            const projectId = card.getAttribute('data-project-id');
            if (!projectId) return;

            card.setAttribute('role', 'button');
            card.setAttribute('tabindex', '0');

            card.addEventListener('click', (e) => {
                // Let explicit CTA actions behave normally.
                if (e.target.closest('a, button')) return;
                this.openProjectLink(projectId);
            });

            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.openProjectLink(projectId);
                }
            });
        });
    }

    openProjectLink(projectId) {
        const project = projectsData.find(p => p.id === projectId);
        if (!project) return;

        const primaryUrl = project.liveDemo || project.githubUrl;
        if (primaryUrl) {
            window.open(primaryUrl, '_blank');
        }
    }
    
    attachDemoButtonListeners() {
        const demoBtns = document.querySelectorAll('.project-demo-btn');
        demoBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const projectId = e.currentTarget.getAttribute('data-project-id');
                this.handleDemoClick(projectId);
            });
        });
    }
    
    handleDemoClick(projectId) {
        const project = projectsData.find(p => p.id === projectId);
        if (!project) return;
        
        // If project has liveDemo link, open in new tab
        if (project.liveDemo) {
            window.open(project.liveDemo, '_blank');
        } 
        // Otherwise, open video modal
        else if (project.demoVideo) {
            this.openVideoModal(projectId);
        }
    }
    
    createVideoModal() {
        const modal = document.createElement('div');
        modal.id = 'videoModal';
        modal.className = 'video-modal';
        modal.innerHTML = `
            <div class="video-modal-backdrop"></div>
            <div class="video-modal-content">
                <button class="video-modal-close">
                    <i class="fas fa-times"></i>
                </button>
                <div class="video-container" id="videoContainer"></div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Close modal listeners
        const backdrop = modal.querySelector('.video-modal-backdrop');
        const closeBtn = modal.querySelector('.video-modal-close');
        
        backdrop.addEventListener('click', () => this.closeVideoModal());
        closeBtn.addEventListener('click', () => this.closeVideoModal());
        
        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isModalOpen) {
                this.closeVideoModal();
            }
        });
    }
    
    openVideoModal(projectId) {
        const project = projectsData.find(p => p.id === projectId);
        if (!project || !project.demoVideo) return;
        
        const modal = document.getElementById('videoModal');
        const container = document.getElementById('videoContainer');
        
        // Clear previous content
        container.innerHTML = '';
        
        // Create video element based on type
        if (project.demoVideo.type === 'youtube') {
            container.innerHTML = `
                <iframe 
                    src="${project.demoVideo.url}?autoplay=1&rel=0" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen
                    loading="lazy">
                </iframe>
            `;
        } else if (project.demoVideo.type === 'mp4') {
            container.innerHTML = `
                <video controls autoplay>
                    <source src="${project.demoVideo.url}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            `;
        }
        
        // Show modal with animation
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.isModalOpen = true;
    }
    
    closeVideoModal() {
        const modal = document.getElementById('videoModal');
        const container = document.getElementById('videoContainer');
        
        // Remove active class for exit animation
        modal.classList.remove('active');
        document.body.style.overflow = '';
        this.isModalOpen = false;
        
        // Clear video after animation
        setTimeout(() => {
            container.innerHTML = '';
        }, 300);
    }
    
    filterProjects(domain) {
        this.currentFilter = domain;
        const projectsContainer = document.querySelector('#projectsSection .section-content');
        const domainsContainer = document.querySelector('.project-domains-container');
        const selectedDomainTitle = document.getElementById('selectedDomainTitle');
        
        const carousel = document.querySelector('.projects-carousel');
        if (!carousel) return;

        carousel.style.opacity = '0';
        if (projectsContainer) projectsContainer.style.display = 'block';
        if (domainsContainer) domainsContainer.style.display = 'none';
        if (selectedDomainTitle) selectedDomainTitle.textContent = domain;
        
        setTimeout(() => {
            this.filteredProjects = projectsData.filter(p => p.domain === domain);

            this.renderProjects();
            this.updateCarousel();
            
            carousel.style.opacity = '1';
        }, 300);
 
        // Update active domain card
        document.querySelectorAll('.domain-card').forEach(card => {
            card.classList.toggle('active', card.getAttribute('data-domain') === domain);
        });

        const projectsList = document.querySelector('.projects-carousel');
        if (projectsList) {
            projectsList.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    showDomainsView() {
        const projectsContainer = document.querySelector('#projectsSection .section-content');
        const domainsContainer = document.querySelector('.project-domains-container');
        const selectedDomainTitle = document.getElementById('selectedDomainTitle');
        const carousel = document.querySelector('.projects-carousel');

        this.currentFilter = null;
        this.filteredProjects = [];

        if (domainsContainer) domainsContainer.style.display = 'block';
        if (projectsContainer) projectsContainer.style.display = 'none';
        if (selectedDomainTitle) selectedDomainTitle.textContent = '';
        if (carousel) carousel.innerHTML = '';

        document.querySelectorAll('.domain-card').forEach(card => {
            card.classList.remove('active');
        });
    }
    
    createDots() {
        const dotsContainer = document.getElementById('carouselDots');
        if (!dotsContainer) return;

        dotsContainer.innerHTML = '';
        dotsContainer.style.display = 'none';
    }
    
    updateCarousel() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
    }
    
    nextSlide() {
        return;
    }
    
    prevSlide() {
        return;
    }
    
    goToSlide(index) {
        return;
    }
    
    setupEventListeners() {
        // Domain cards
        const domainCards = document.querySelectorAll('.domain-card');
        domainCards.forEach(card => {
            card.addEventListener('click', () => {
                const domain = card.getAttribute('data-domain');
                this.filterProjects(domain);
            });
        });

        const backToDomainsBtn = document.getElementById('backToDomainsBtn');
        if (backToDomainsBtn) {
            backToDomainsBtn.addEventListener('click', () => this.showDomainsView());
        }
        
        // Carousel buttons hidden in domain list mode
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
    }
}

// Initialize when DOM is ready
let projectsManager;

function initProjects() {
    if (typeof projectsData !== 'undefined' && typeof categoryConfig !== 'undefined') {
        projectsManager = new ProjectsManager();
        window.projectsManager = projectsManager;
    }
}

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProjects);
} else {
    initProjects();
}
