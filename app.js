// IoT Boot Camp Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initParallax();
    initCountdown();
    initSmoothScrolling();
    initNavbarScroll();
    initScrollProgress();
    initAnimations();
    initMobileMenu();
    initRegistrationHandlers();
});

// Parallax Effect for Hero Section
function initParallax() {
    const heroBackground = document.querySelector('.hero-bg');
    
    if (heroBackground) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            
            // Apply parallax transform
            heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        });
    }
}

// Countdown Timer for Registration Deadline
function initCountdown() {
    const countdownElement = document.getElementById('countdown');
    
    if (!countdownElement) return;
    
    // Registration deadline: July 23, 2025
    const deadline = new Date('2025-07-23T23:59:59').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = deadline - now;
        
        if (timeLeft > 0) {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            countdownElement.innerHTML = `
                <div class="d-flex justify-content-center gap-2 flex-wrap">
                    <span class="badge bg-warning text-dark">${days}d</span>
                    <span class="badge bg-warning text-dark">${hours}h</span>
                    <span class="badge bg-warning text-dark">${minutes}m</span>
                    <span class="badge bg-warning text-dark">${seconds}s</span>
                </div>
            `;
        } else {
            countdownElement.innerHTML = '<span class="badge bg-danger">Registration Closed</span>';
        }
    }
    
    // Update countdown immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    // Get all navigation links that start with #
    const navLinks = document.querySelectorAll('.nav-link[href^="#"], a[href^="#"]:not([href="#"])');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = targetSection.offsetTop - navbarHeight - 20;
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                const navbarToggler = document.querySelector('.navbar-toggler');
                
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
                
                // Update active link
                updateActiveNavLink();
            }
        });
    });
}

// Navbar Scroll Behavior
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    if (!navbar) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
    });
}

// Update Active Navigation Link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    let current = 'home'; // Default to home
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar ? navbar.offsetHeight : 0;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbarHeight - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionBottom) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Scroll Progress Indicator
function initScrollProgress() {
    // Create scroll progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-indicator';
    progressBar.innerHTML = '<div class="scroll-progress"></div>';
    document.body.prepend(progressBar);
    
    const scrollProgress = document.querySelector('.scroll-progress');
    
    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    });
}

// Intersection Observer for Animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // Animate cards with stagger effect
                if (entry.target.classList.contains('highlight-card') || 
                    entry.target.classList.contains('feature-item')) {
                    animateCards(entry.target.parentElement);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.card, .feature-item, .contact-card');
    animatedElements.forEach(el => observer.observe(el));
}

// Animate Cards with Stagger Effect
function animateCards(container) {
    const cards = container.querySelectorAll('.highlight-card, .feature-item, .contact-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        }, index * 100);
    });
}

// Registration Button Click Handler
function initRegistrationHandlers() {
    const registrationButtons = document.querySelectorAll('.btn-primary, a[href="#registration"]');
    
    registrationButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add loading state for buttons
            if (this.classList.contains('btn-primary') && !this.getAttribute('href')) {
                this.classList.add('btn-loading');
                setTimeout(() => {
                    this.classList.remove('btn-loading');
                }, 1000);
            }
        });
    });
}

// Mobile Menu Enhancement
function initMobileMenu() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        // Close menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navbarCollapse.classList.contains('show')) {
                    setTimeout(() => {
                        navbarToggler.click();
                    }, 100);
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.navbar') && navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    }
}

// Accordion Enhancement
function initAccordion() {
    const accordionButtons = document.querySelectorAll('.accordion-button');
    
    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add smooth transition effect
            const targetCollapse = document.querySelector(this.getAttribute('data-bs-target'));
            if (targetCollapse) {
                setTimeout(() => {
                    if (!this.classList.contains('collapsed')) {
                        const navbar = document.querySelector('.navbar');
                        const navbarHeight = navbar ? navbar.offsetHeight : 0;
                        const targetPosition = targetCollapse.offsetTop - navbarHeight - 20;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }, 350);
            }
        });
    });
}

// Initialize accordion after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initAccordion, 100);
});

// Form Validation (if contact form is added)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('is-invalid');
            isValid = false;
        } else {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        }
    });
    
    return isValid;
}

// Page Load Performance
window.addEventListener('load', function() {
    // Hide loading spinner if present
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }
    
    // Add loaded class to body for CSS animations
    document.body.classList.add('loaded');
    
    // Trigger initial active nav link update
    setTimeout(updateActiveNavLink, 100);
});

// Resize Handler
window.addEventListener('resize', function() {
    // Recalculate parallax on resize
    if (window.innerWidth <= 768) {
        // Disable parallax on mobile for better performance
        const heroBackground = document.querySelector('.hero-bg');
        if (heroBackground) {
            heroBackground.style.transform = 'translateY(0)';
        }
    }
});

// Contact Information Click Handlers
function initContactHandlers() {
    // Phone number click handler
    const phoneText = document.querySelectorAll('p:contains("044 2251 6335")');
    phoneText.forEach(el => {
        el.style.cursor = 'pointer';
        el.addEventListener('click', function() {
            if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                window.open('tel:+914422516335', '_self');
            }
        });
    });
    
    // Email click handler  
    const emailText = document.querySelectorAll('p:contains("office.ciot.au@gmail.com")');
    emailText.forEach(el => {
        el.style.cursor = 'pointer';
        el.addEventListener('click', function() {
            window.open('mailto:office.ciot.au@gmail.com', '_blank');
        });
    });
}

// Initialize contact handlers
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initContactHandlers, 500);
});

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(function() {
    updateActiveNavLink();
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Keyboard Navigation Enhancement
document.addEventListener('keydown', function(e) {
    // ESC key to close mobile menu
    if (e.key === 'Escape') {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        const navbarToggler = document.querySelector('.navbar-toggler');
        
        if (navbarCollapse && navbarCollapse.classList.contains('show') && navbarToggler) {
            navbarToggler.click();
        }
    }
});

// Analytics/Tracking (placeholder for future implementation)
function trackEvent(eventName, properties = {}) {
    console.log('Event tracked:', eventName, properties);
}

// Track important user interactions
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn-primary')) {
        trackEvent('registration_button_clicked');
    }
    
    if (e.target.matches('.nav-link')) {
        trackEvent('navigation_clicked', {
            section: e.target.getAttribute('href')
        });
    }
});

// Error Handling
window.addEventListener('error', function(e) {
    console.warn('Non-critical error:', e.error);
});

// Theme detection (for future dark mode support)
function detectColorScheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-theme');
    }
}

// Initialize theme detection
document.addEventListener('DOMContentLoaded', detectColorScheme);

// Listen for theme changes
if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', detectColorScheme);
}