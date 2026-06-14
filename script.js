const router = new Router();
window.router = router;

function hideAllViews() {
    document.getElementById('mainView').style.display = 'none';
    document.querySelectorAll('.section-view').forEach(s => {
        s.style.display = 'none';
    });
}

function showMainView() {
    hideAllViews();
    document.getElementById('mainView').style.display = 'flex';
}

function showSectionView(sectionId) {
    hideAllViews();
    const el = document.getElementById(sectionId);
    if (el) {
        el.style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

router.register('/', () => showMainView());
router.register('/me', () => showSectionView('meSection'));
router.register('/skills', () => showSectionView('skillsSection'));
router.register('/education', () => showSectionView('educationSection'));
router.register('/contact', () => showSectionView('contactSection'));

router.register('/projects', () => {
    showSectionView('projectsSection');
    if (window.projectsManager) {
        window.projectsManager.showDomainsView();
    }
});

router.register('/projects/:slug', (params) => {
    showSectionView('projectsSection');
    if (window.projectsManager) {
        const domain = slugToDomain[params.slug];
        if (domain) {
            window.projectsManager.filterProjects(domain);
        } else {
            router.navigate('/projects');
        }
    }
});

const navButtons = document.querySelectorAll('.nav-btn');
const sectionRouteMap = {
    'me': '/me',
    'projects': '/projects',
    'skills': '/skills',
    'education': '/education',
    'contact': '/contact'
};

navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const sectionName = btn.getAttribute('data-section');
        const route = sectionRouteMap[sectionName];
        if (route) {
            window.router.navigate(route);
        }
    });
});

// ===== SEARCH FUNCTIONALITY REMOVED =====
// The chatbot (chatbot.js) now handles all search input functionality
// No need for duplicate handlers here

// Carousel functionality (legacy – kept for chatbot compatibility)
let currentSlide = 0;
const projectCards = document.querySelectorAll('.project-card-large');
const totalSlides = projectCards.length;
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('carouselDots');

function createDots() {
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
}

function updateCarousel() {
    projectCards.forEach(card => {
        card.classList.remove('active');
    });
    projectCards[currentSlide].classList.add('active');
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide === totalSlides - 1;
}

function nextSlide() {
    if (currentSlide < totalSlides - 1) {
        currentSlide++;
        updateCarousel();
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
        updateCarousel();
    }
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
}

if (projectCards.length > 0) {
    createDots();
    updateCarousel();
}

document.addEventListener('keydown', (e) => {
    if (document.getElementById('projectsSection').style.display === 'block') {
        if (e.key === 'ArrowRight') {
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
        }
    }
});

// Eye movement animation
const pupils = document.querySelectorAll('.pupil');
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    pupils.forEach(pupil => {
        const eye = pupil.parentElement;
        const eyeRect = eye.getBoundingClientRect();
        const eyeCenterX = eyeRect.left + eyeRect.width / 2;
        const eyeCenterY = eyeRect.top + eyeRect.height / 2;
        
        const angle = Math.atan2(mouseY - eyeCenterY, mouseX - eyeCenterX);
        const distance = Math.min(4, Math.hypot(mouseX - eyeCenterX, mouseY - eyeCenterY) / 50);
        
        const pupilX = Math.cos(angle) * distance;
        const pupilY = Math.sin(angle) * distance;
        
        pupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
    });
});

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add entrance animations
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ===== Smooth reveal animations on scroll =====
(function setupReveal() {
  const targets = document.querySelectorAll("section, .card, .project-card-large, .skills-category, .education-item, .contact-card");
  targets.forEach((el) => el.classList.add("reveal"));

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("in");
      });
    },
    { threshold: 0.12 }
  );

  targets.forEach((el) => io.observe(el));
})();

// Export for chatbot access
window.currentProjectIndex = currentSlide;
window.updateCarousel = updateCarousel;
