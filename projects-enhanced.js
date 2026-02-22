// Enhanced Projects Module
class ProjectsManager {
    constructor() {
        this.currentSlide = 0;
        this.currentFilter = 'All';
        this.filteredProjects = [...projectsData];
        this.isModalOpen = false;
        
        this.init();
    }
    
    init() {
        this.renderFilterTabs();
        this.renderProjects();
        this.createDots();
        this.setupEventListeners();
        this.updateCarousel();
        this.createVideoModal();
    }
    
    renderFilterTabs() {
        const filterContainer = document.getElementById('projectFilters');
        if (!filterContainer) return;
        
        filterContainer.innerHTML = allCategories.map(category => `
            <button class="filter-tab ${category === 'All' ? 'active' : ''}" 
                    data-category="${category}">
                ${category}
            </button>
        `).join('');
    }
    
    renderProjects() {
        const carousel = document.querySelector('.projects-carousel');
        if (!carousel) return;
        
        carousel.innerHTML = this.filteredProjects.map((project, index) => {
            const categoryStyle = categoryConfig[project.category] || categoryConfig['AI System'];
            
            // Determine if project has demo (either video or live link)
            const hasDemo = project.demoVideo || project.liveDemo;
            const demoButtonText = project.liveDemo ? 'Try Live Demo' : 'Watch Demo';
            const demoIcon = project.liveDemo ? 'fas fa-external-link-alt' : 'fas fa-play-circle';
            
            return `
                <div class="project-card-large ${index === 0 ? 'active' : ''}" 
                     data-index="${index}"
                     data-category="${project.category}">
                    <div class="project-tag-enhanced" 
                         style="background: ${categoryStyle.gradient}; 
                                color: ${categoryStyle.color}; 
                                box-shadow: 0 0 20px ${categoryStyle.glow};">
                        ${project.isLive ? '🔴 Live • ' : ''}${project.category}
                    </div>
                    <h3>${project.title}</h3>
                    <div class="project-preview ${project.image ? 'project-screenshot' : ''}">
                        ${project.image 
                            ? `<img src="${project.image}" alt="${project.title}" loading="lazy">` 
                            : `<div class="project-icon"><i class="${project.icon}"></i></div>`
                        }
                    </div>
                    <p class="project-desc">${project.description}</p>
                    <div class="project-tech-tags">
                        ${project.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                    <div class="project-actions">
                        <a href="${project.githubUrl}" target="_blank" class="project-link">
                            <i class="fab fa-github"></i> View on GitHub
                        </a>
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
    
    filterProjects(category) {
        this.currentFilter = category;
        
        // Fade out current projects
        const carousel = document.querySelector('.projects-carousel');
        carousel.style.opacity = '0';
        
        setTimeout(() => {
            if (category === 'All') {
                this.filteredProjects = [...projectsData];
            } else {
                this.filteredProjects = projectsData.filter(p => p.category === category);
            }
            
            this.currentSlide = 0;
            this.renderProjects();
            this.createDots();
            this.updateCarousel();
            
            // Fade in new projects
            carousel.style.opacity = '1';
        }, 300);
        
        // Update active tab
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.classList.toggle('active', tab.getAttribute('data-category') === category);
        });
    }
    
    createDots() {
        const dotsContainer = document.getElementById('carouselDots');
        if (!dotsContainer) return;
        
        dotsContainer.innerHTML = this.filteredProjects.map((_, index) => `
            <div class="dot ${index === 0 ? 'active' : ''}" data-index="${index}"></div>
        `).join('');
        
        // Add click listeners to dots
        dotsContainer.querySelectorAll('.dot').forEach(dot => {
            dot.addEventListener('click', () => {
                const index = parseInt(dot.getAttribute('data-index'));
                this.goToSlide(index);
            });
        });
    }
    
    updateCarousel() {
        const cards = document.querySelectorAll('.project-card-large');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        // Update cards
        cards.forEach((card, index) => {
            card.classList.toggle('active', index === this.currentSlide);
        });
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
        
        // Update buttons
        if (prevBtn) prevBtn.disabled = this.currentSlide === 0;
        if (nextBtn) nextBtn.disabled = this.currentSlide === this.filteredProjects.length - 1;
    }
    
    nextSlide() {
        if (this.currentSlide < this.filteredProjects.length - 1) {
            this.currentSlide++;
            this.updateCarousel();
        }
    }
    
    prevSlide() {
        if (this.currentSlide > 0) {
            this.currentSlide--;
            this.updateCarousel();
        }
    }
    
    goToSlide(index) {
        this.currentSlide = index;
        this.updateCarousel();
    }
    
    setupEventListeners() {
        // Filter tabs
        const filterTabs = document.querySelectorAll('.filter-tab');
        filterTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const category = tab.getAttribute('data-category');
                this.filterProjects(category);
            });
        });
        
        // Carousel buttons
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        if (prevBtn) prevBtn.addEventListener('click', () => this.prevSlide());
        if (nextBtn) nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            const projectsSection = document.getElementById('projectsSection');
            if (projectsSection && projectsSection.style.display === 'block' && !this.isModalOpen) {
                if (e.key === 'ArrowRight') this.nextSlide();
                if (e.key === 'ArrowLeft') this.prevSlide();
            }
        });
    }
}

// Initialize when DOM is ready
let projectsManager;

function initProjects() {
    if (typeof projectsData !== 'undefined' && typeof categoryConfig !== 'undefined') {
        projectsManager = new ProjectsManager();
    }
}

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProjects);
} else {
    initProjects();
}
