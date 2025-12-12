// Navigation functionality
const navButtons = document.querySelectorAll('.nav-btn');
const mainView = document.getElementById('mainView');
const sections = {
    'me': document.getElementById('meSection'),
    'projects': document.getElementById('projectsSection'),
    'skills': document.getElementById('skillsSection'),
    'education': document.getElementById('educationSection'),
    'contact': document.getElementById('contactSection')
};

navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const sectionName = btn.getAttribute('data-section');
        showSection(sectionName);
    });
});

function showSection(sectionName) {
    mainView.style.display = 'none';
    
    Object.keys(sections).forEach(key => {
        sections[key].style.display = 'none';
    });
    
    if (sections[sectionName]) {
        sections[sectionName].style.display = 'block';
    }
}

function showMain() {
    Object.keys(sections).forEach(key => {
        sections[key].style.display = 'none';
    });
    mainView.style.display = 'flex';
}

// Search functionality
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

searchBtn.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

function handleSearch() {
    const query = searchInput.value.toLowerCase().trim();
    
    if (!query) return;
    
    // Simple keyword matching
    if (query.includes('project') || query.includes('work') || query.includes('github') || 
        query.includes('salasar') || query.includes('genbook') || query.includes('finsight')) {
        showSection('projects');
    } else if (query.includes('skill') || query.includes('tech') || query.includes('stack') || 
               query.includes('python') || query.includes('typescript')) {
        showSection('skills');
    } else if (query.includes('about') || query.includes('me') || query.includes('who')) {
        showSection('me');
    } else if (query.includes('education') || query.includes('learn') || query.includes('study')) {
        showSection('education');
    } else if (query.includes('contact') || query.includes('email') || query.includes('reach')) {
        showSection('contact');
    } else {
        // Default to showing about section
        showSection('me');
    }
    
    searchInput.value = '';
}

// Carousel functionality
let currentSlide = 0;
const projectCards = document.querySelectorAll('.project-card-large');
const totalSlides = projectCards.length;
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('carouselDots');

// Create dots
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
    // Hide all cards
    projectCards.forEach(card => {
        card.classList.remove('active');
    });
    
    // Show current card
    projectCards[currentSlide].classList.add('active');
    
    // Update dots
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
    
    // Update button states
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

// Event listeners for carousel
if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
}

// Initialize carousel
if (projectCards.length > 0) {
    createDots();
    updateCarousel();
}

// Keyboard navigation for carousel
document.addEventListener('keydown', (e) => {
    if (sections.projects.style.display === 'block') {
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

// Auto-play carousel (optional - uncomment to enable)
// let autoPlayInterval;
// function startAutoPlay() {
//     autoPlayInterval = setInterval(() => {
//         if (currentSlide < totalSlides - 1) {
//             nextSlide();
//         } else {
//             currentSlide = 0;
//             updateCarousel();
//         }
//     }, 5000); // Change slide every 5 seconds
// }

// function stopAutoPlay() {
//     clearInterval(autoPlayInterval);
// }

// Start auto-play when projects section is visible
// const observer = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting && entry.target.id === 'projectsSection') {
//             startAutoPlay();
//         } else {
//             stopAutoPlay();
//         }
//     });
// });

// if (sections.projects) {
//     observer.observe(sections.projects);
// }

// ===== Smooth reveal animations on scroll =====
(function setupReveal() {
  // add .reveal to cards/sections (customize selectors as per your HTML)
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
