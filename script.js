// Page Transition System
function initPageTransition() {
    // Create transition overlay
    const transition = document.createElement('div');
    transition.className = 'page-transition';
    transition.innerHTML = '<div class="page-transition-loader"></div>';
    document.body.appendChild(transition);

    // Hide transition after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            transition.classList.add('fade-out');
            setTimeout(() => {
                transition.remove();
            }, 500);
        }, 300);
    });

    // Handle page navigation (only for internal links)
    document.querySelectorAll('a[href]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // Only handle internal HTML page links
            if (href && 
                !href.startsWith('#') && 
                !href.startsWith('http') && 
                !href.startsWith('//') && 
                !href.startsWith('mailto:') && 
                !href.startsWith('tel:') &&
                (href.endsWith('.html') || href === 'index.html' || !href.includes('.'))) {
                
                // Check if it's a navigation link
                if (this.classList.contains('nav-link') || href.includes('.html')) {
                    e.preventDefault();
                    showPageTransition(() => {
                        window.location.href = href;
                    });
                }
            }
        });
    });
}

function showPageTransition(callback) {
    const transition = document.createElement('div');
    transition.className = 'page-transition';
    transition.innerHTML = '<div class="page-transition-loader"></div>';
    document.body.appendChild(transition);
    
    setTimeout(() => {
        if (callback) callback();
    }, 300);
}

// Page Load Animation
document.addEventListener('DOMContentLoaded', () => {
    // Initialize page transition
    initPageTransition();
    
    // Animate elements on page load
    animateOnScroll();
    initCounterAnimations();
    initFeatureAnimations();
    initPageContentAnimations();
});

// Animate page content on load
function initPageContentAnimations() {
    // Add page-content class to main sections
    const mainSections = document.querySelectorAll('section:not(.hero)');
    mainSections.forEach((section, index) => {
        section.classList.add('section-enter');
        section.style.animationDelay = `${0.1 * index}s`;
        
        // Make visible after a short delay
        setTimeout(() => {
            section.classList.add('visible');
        }, 100 * index);
    });

    // Add stagger animation to grids
    const grids = document.querySelectorAll('.services-grid, .features-grid, .values-grid, .process-steps, .mission-points');
    grids.forEach(grid => {
        grid.classList.add('stagger-children');
    });

    // Animate page header
    const pageHeader = document.querySelector('.page-header');
    if (pageHeader) {
        pageHeader.style.opacity = '0';
        pageHeader.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            pageHeader.style.transition = 'all 0.8s ease-out';
            pageHeader.style.opacity = '1';
            pageHeader.style.transform = 'translateY(0)';
        }, 100);
    }

    // Animate hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        const children = heroContent.children;
        Array.from(children).forEach((child, index) => {
            child.style.opacity = '0';
            child.style.transform = 'translateY(20px)';
            setTimeout(() => {
                child.style.transition = `all 0.6s ease-out ${0.1 * index}s`;
                child.style.opacity = '1';
                child.style.transform = 'translateY(0)';
            }, 50);
        });
    }
}

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });
}

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Get submit button and disable it
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Submitting...';
    
    // Remove any existing messages
    removeFormMessages();
    
    try {
        // Determine API endpoint
        // Use localhost for development, Netlify function for production
        const apiUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
            ? 'http://localhost:3000/api/contact'
            : '/.netlify/functions/send-email';
        
        // Send data to backend
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        
        const result = await response.json();
        
        if (response.ok && result.success) {
            // Show success message
            showFormMessage(result.message || 'Thank you! Your inquiry has been submitted successfully. We will contact you shortly.', 'success');
            
            // Reset form
            contactForm.reset();
        } else {
            // Show validation errors or error message
            if (result.errors && result.errors.length > 0) {
                const errorMessages = result.errors.map(err => err.msg).join('<br>');
                showFormMessage(errorMessages, 'error');
            } else {
                const errorMsg = result.error || result.message || 'An error occurred. Please try again.';
                showFormMessage(errorMsg, 'error');
                console.error('Form submission error:', result);
            }
        }
    } catch (error) {
        console.error('Form submission error:', error);
        let errorMessage = 'Unable to submit form. Please check your connection and try again.';
        
        // Provide more specific error messages
        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
            errorMessage = 'Network error. Please check your internet connection and try again.';
        } else if (error.message.includes('404')) {
            errorMessage = 'Form service not found. Please contact us directly or try again later.';
        }
        
        showFormMessage(errorMessage + ' You can also call us at 0832759626.', 'error');
    } finally {
        // Re-enable submit button
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
    }
    });
}

function showFormMessage(message, type = 'success') {
    // Remove any existing messages
    removeFormMessages();
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message form-message-${type}`;
    messageDiv.innerHTML = message;
    
    // Insert before form
    contactForm.insertBefore(messageDiv, contactForm.firstChild);
    
    // Trigger animation by adding show class after a brief delay
    setTimeout(() => {
        messageDiv.classList.add('show');
    }, 10);
    
    // Scroll to message
    messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Hide after 8 seconds for success, keep error visible
    if (type === 'success') {
        setTimeout(() => {
            messageDiv.classList.remove('show');
            setTimeout(() => messageDiv.remove(), 300);
        }, 8000);
    }
}

function removeFormMessages() {
    const existingMessages = document.querySelectorAll('.form-message');
    existingMessages.forEach(msg => msg.remove());
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Animate elements on scroll
function animateOnScroll() {
    const animatedElements = document.querySelectorAll('.service-card, .feature-item, .stat-item, .value-card, .process-step, .mission-point');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Feature animations
function initFeatureAnimations() {
    const featureObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                featureObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.feature-animate').forEach(el => {
        featureObserver.observe(el);
    });
}

// Add active state to current section in navigation
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Number counter animation for stats
function animateValue(element, start, end, duration, suffix = '') {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value + suffix;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Initialize counter animations
function initCounterAnimations() {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-number[data-target]');
                if (statNumber) {
                    const target = parseInt(statNumber.getAttribute('data-target'));
                    const originalText = statNumber.textContent;
                    const hasPlus = originalText.includes('+');
                    const hasPercent = originalText.includes('%');
                    const suffix = (hasPlus ? '+' : '') + (hasPercent ? '%' : '');
                    
                    statNumber.textContent = '0' + suffix;
                    animateValue(statNumber, 0, target, 2000, suffix);
                }
                
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    // Observe stat items and stat boxes
    document.querySelectorAll('.stat-item, .stat-box, .stat-card').forEach(stat => {
        statsObserver.observe(stat);
    });
}

// Enhanced smooth scroll for anchor links (only on same page)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 80;
            
            // Use smooth scrolling with better browser support
            if ('scrollBehavior' in document.documentElement.style) {
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            } else {
                // Fallback for older browsers
                smoothScrollTo(offsetTop, 800);
            }
        }
    });
});

// Smooth scroll fallback function for older browsers
function smoothScrollTo(targetPosition, duration) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Add parallax effect to hero
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add active state to navigation based on current page
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Set active nav link on page load
setActiveNavLink();
