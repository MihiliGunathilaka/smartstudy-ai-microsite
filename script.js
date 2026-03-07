/* ============================================
   SmartStudy AI - Main JavaScript
   ============================================ */

// === Mobile Navigation Toggle ===
document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            // Animate hamburger
            this.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });
    }
});

// === Navbar Scroll Effect ===
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// === Animated Counter ===
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    counters.forEach(function(counter) {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;

        function updateCounter() {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        }

        // Only animate when in viewport
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(counter);
    });
}

document.addEventListener('DOMContentLoaded', animateCounters);

// === FAQ Toggle ===
function toggleFaq(button) {
    const faqItem = button.parentElement;
    const answer = faqItem.querySelector('.faq-answer');
    const isActive = button.classList.contains('active');

    // Close all other FAQs
    document.querySelectorAll('.faq-question.active').forEach(function(activeBtn) {
        if (activeBtn !== button) {
            activeBtn.classList.remove('active');
            activeBtn.parentElement.querySelector('.faq-answer').style.maxHeight = '0';
        }
    });

    // Toggle current
    if (isActive) {
        button.classList.remove('active');
        answer.style.maxHeight = '0';
    } else {
        button.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
    }
}

// === Scroll Reveal Animation ===
function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.step-card, .feature-card, .testimonial-card, .value-card, ' +
        '.stat-card, .blog-post, .additional-card, .tech-card, ' +
        '.feature-detail-content, .feature-detail-visual, ' +
        '.story-card, .pricing-card'
    );

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(function(el, index) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease ' + (index % 4) * 0.1 + 's, transform 0.6s ease ' + (index % 4) * 0.1 + 's';
        observer.observe(el);
    });
}

document.addEventListener('DOMContentLoaded', initScrollReveal);

// === Smooth Scroll for Anchor Links ===
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
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
});

// === Active Navigation Highlight ===
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(function(link) {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// === Progress Bar Animation (Features page) ===
function animateProgressBars() {
    const bars = document.querySelectorAll('.progress-bar, .confidence-fill, .chart-bar');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.style.width;
                entry.target.style.height = entry.target.style.height;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    bars.forEach(function(bar) {
        observer.observe(bar);
    });
}

document.addEventListener('DOMContentLoaded', animateProgressBars);
