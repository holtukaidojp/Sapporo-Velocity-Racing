/* =============================================
   SCRIPT.JS - SVR Professional Website
   Sapporo Velocity Racing
   ============================================= */

// =============================================
// SCROLL ANIMATIONS WITH INTERSECTION OBSERVER
// =============================================

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Remove hidden class and add show class
            entry.target.classList.remove('hidden');
            entry.target.classList.add('show');
            
            // Add delay class for staggered animation
            const delayClass = `delay-${(index % 8) + 1}`;
            entry.target.classList.add(delayClass);
            
            // Animate numbers if it's a stat counter
            if (entry.target.classList.contains('number')) {
                animateCounter(entry.target);
            }
            
            // Stop observing this element
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
});

// Observe all elements with hidden class
document.querySelectorAll('.hidden').forEach(el => {
    observer.observe(el);
});

// =============================================
// COUNTER ANIMATION FOR STATISTICS
// =============================================

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target')) || 0;
    
    if (isNaN(target) || target === 0) return;
    
    const duration = 2500; // 2.5 seconds
    const start = Date.now();
    const startValue = 0;
    
    const animate = () => {
        const now = Date.now();
        const progress = Math.min((now - start) / duration, 1);
        
        // Easing function for smooth animation
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(easeOut * (target - startValue) + startValue);
        
        element.textContent = current.toLocaleString('ja-JP');
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            element.textContent = target.toLocaleString('ja-JP');
        }
    };
    
    requestAnimationFrame(animate);
}

// =============================================
// SMOOTH SCROLLING FOR NAVIGATION LINKS
// =============================================

document.querySelectorAll('.nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            // Calculate offset to account for fixed header
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// =============================================
// PARALLAX EFFECT ON HERO SECTION
// =============================================

let ticking = false;
let heroParallax = null;

function updateParallax() {
    if (!heroParallax) {
        heroParallax = document.querySelector('.hero');
    }
    
    if (heroParallax) {
        const scrolled = window.scrollY;
        const heroBottom = heroParallax.offsetTop + heroParallax.offsetHeight;
        
        if (scrolled < heroBottom) {
            const parallaxFactor = scrolled * 0.5;
            heroParallax.style.backgroundPosition = `center ${parallaxFactor}px`;
        }
    }
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// =============================================
// HERO BUTTON CLICK EVENT
// =============================================

const heroBtn = document.querySelector('.hero-btn');
if (heroBtn) {
    heroBtn.addEventListener('click', () => {
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = aboutSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
}

// =============================================
// ADD SCROLL INDICATOR TO HEADER
// =============================================

let lastScrollY = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        if (!header.classList.contains('scrolled')) {
            header.classList.add('scrolled');
        }
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScrollY = window.scrollY;
});

// =============================================
// DYNAMIC YEAR IN FOOTER
// =============================================

document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear();
    const footerText = document.querySelector('.footer-info p');
    
    if (footerText) {
        footerText.textContent = `© ${currentYear} Sapporo Velocity Racing. All rights reserved.`;
    }
});

// =============================================
// ADD SCROLL STYLE TO HEADER
// =============================================

const style = document.createElement('style');
style.textContent = `
    header.scrolled {
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        background: rgba(255, 255, 255, 0.98);
    }
`;
document.head.appendChild(style);

// =============================================
// GALLERY IMAGE INTERACTION
// =============================================

const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

// =============================================
// TOUCH SUPPORT FOR MOBILE
// =============================================

if (window.matchMedia('(max-width: 768px)').matches) {
    // Disable parallax on mobile for better performance
    window.removeEventListener('scroll', updateParallax);
}

// =============================================
// ACCESSIBILITY - KEYBOARD NAVIGATION
// =============================================

document.addEventListener('keydown', (e) => {
    // Press 'H' to scroll to Hero
    if (e.key === 'h' || e.key === 'H') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Press 'A' to scroll to About
    if (e.key === 'a' || e.key === 'A') {
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = aboutSection.offsetTop - headerHeight;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
    }
});

// =============================================
// PERFORMANCE MONITORING
// =============================================

if (window.requestIdleCallback) {
    requestIdleCallback(() => {
        console.log('SVR Website loaded successfully');
    });
} else {
    setTimeout(() => {
        console.log('SVR Website loaded successfully');
    }, 2000);
}

// =============================================
// PRELOAD IMAGES
// =============================================

function preloadImages() {
    const images = [
        'https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1558618047-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Preload images after page load
window.addEventListener('load', preloadImages);
