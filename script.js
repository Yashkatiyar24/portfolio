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
    if (query.includes('project') || query.includes('work') || query.includes('supportport')) {
        showSection('projects');
    } else if (query.includes('skill') || query.includes('tech') || query.includes('stack')) {
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