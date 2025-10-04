// ===== PORTFOLIO JAVASCRIPT =====
// Modern ES6+ JavaScript for interactive portfolio functionality

(function() {
    'use strict';

    // ===== UTILITY FUNCTIONS =====
    const $ = (selector) => document.querySelector(selector);
    const $$ = (selector) => document.querySelectorAll(selector);
    
    const throttle = (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    };

    const debounce = (func, delay) => {
        let timeoutId;
        return function(...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    };

    // ===== DOM ELEMENTS =====
    const navbar = $('#navbar');
    const hamburger = $('#hamburger');
    const navMenu = $('#nav-menu');
    const navLinks = $$('.nav-link');
    const contactForm = $('#contact-form');
    const themeToggle = $('#theme-toggle');
    const themeIcon = $('.theme-icon');
    
    // ===== NAVBAR FUNCTIONALITY =====
    class NavbarController {
        constructor() {
            this.isScrolled = false;
            this.init();
        }

        init() {
            this.handleScroll();
            this.handleMobileMenu();
            this.handleSmoothScrolling();
            this.highlightActiveSection();
        }

        handleScroll() {
            const handleScrollEvent = throttle(() => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                if (scrollTop > 100 && !this.isScrolled) {
                    navbar.style.background = 'rgba(10, 10, 10, 0.95)';
                    navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
                    this.isScrolled = true;
                } else if (scrollTop <= 100 && this.isScrolled) {
                    navbar.style.background = 'rgba(10, 10, 10, 0.9)';
                    navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
                    this.isScrolled = false;
                }
            }, 16);

            window.addEventListener('scroll', handleScrollEvent);
        }

        handleMobileMenu() {
            hamburger?.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                hamburger.classList.toggle('active');
                
                // Animate hamburger lines
                const spans = hamburger.querySelectorAll('span');
                spans.forEach((span, index) => {
                    span.style.transform = navMenu.classList.contains('active') 
                        ? this.getHamburgerTransform(index) 
                        : 'none';
                });
            });

            // Close mobile menu when clicking on a link
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                    
                    const spans = hamburger.querySelectorAll('span');
                    spans.forEach(span => {
                        span.style.transform = 'none';
                    });
                });
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                    
                    const spans = hamburger.querySelectorAll('span');
                    spans.forEach(span => {
                        span.style.transform = 'none';
                    });
                }
            });
        }

        getHamburgerTransform(index) {
            const transforms = [
                'rotate(45deg) translate(5px, 5px)',
                'opacity: 0',
                'rotate(-45deg) translate(7px, -6px)'
            ];
            return transforms[index] || 'none';
        }

        handleSmoothScrolling() {
            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = link.getAttribute('href');
                    const targetSection = $(targetId);
                    
                    if (targetSection) {
                        const offsetTop = targetSection.offsetTop - 80;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        }

        highlightActiveSection() {
            const sections = $$('section[id]');
            
            const highlightSection = throttle(() => {
                const scrollPos = window.pageYOffset + 150;
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.offsetHeight;
                    const sectionId = section.getAttribute('id');
                    const correspondingLink = $(`.nav-link[href="#${sectionId}"]`);
                    
                    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                        navLinks.forEach(link => link.classList.remove('active'));
                        correspondingLink?.classList.add('active');
                    }
                });
            }, 16);

            window.addEventListener('scroll', highlightSection);
        }
    }

    // ===== ANIMATIONS AND SCROLL EFFECTS =====
    class AnimationController {
        constructor() {
            this.observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };
            this.init();
        }

        init() {
            this.setupIntersectionObserver();
            this.setupParallaxEffects();
            this.setupCounterAnimation();
            this.setupTypingEffect();
        }

        setupIntersectionObserver() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        
                        // Special handling for different elements
                        if (entry.target.classList.contains('skill-category')) {
                            this.animateSkillBars(entry.target);
                        }
                        
                        if (entry.target.classList.contains('project-card')) {
                            this.animateProjectCard(entry.target);
                        }
                    }
                });
            }, this.observerOptions);

            // Observe elements for animation
            const animateElements = $$('.skill-category, .project-card, .timeline-item');
            animateElements.forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                observer.observe(el);
            });
        }

        animateSkillBars(element) {
            // Add skill bar animations if needed
        }

        animateProjectCard(element) {
            // Add project card animations if needed
        }

        setupParallaxEffects() {
            // Add parallax effects if needed
        }

        setupCounterAnimation() {
            // Add counter animations if needed
        }

        setupTypingEffect() {
            // Add typing effects if needed
        }
    }

    // ===== THEME CONTROLLER =====
    class ThemeController {
        constructor() {
            this.isDark = true; // Default to dark theme
            this.init();
        }

        init() {
            this.applyDarkTheme();
            this.setupThemeToggle();
        }

        setupThemeToggle() {
            themeToggle?.addEventListener('click', () => {
                this.toggleTheme();
            });
        }

        toggleTheme() {
            this.isDark = !this.isDark;
            
            if (this.isDark) {
                this.applyDarkTheme();
            } else {
                this.applyLightTheme();
            }

            // Save preference
            localStorage.setItem('portfolio-theme', this.isDark ? 'dark' : 'light');
        }

        applyDarkTheme() {
            document.documentElement.style.setProperty('--primary-color', '#ff6b35');
            document.documentElement.style.setProperty('--text-primary', '#ffffff');
            document.documentElement.style.setProperty('--text-secondary', '#b8bcc8');
            document.documentElement.style.setProperty('--bg-primary', '#0a0a0a');
            document.documentElement.style.setProperty('--bg-secondary', '#141414');
            document.documentElement.style.setProperty('--bg-card', '#1a1a1a');
            document.documentElement.style.setProperty('--border-light', '#2a2a2a');
            
            if (themeIcon) {
                themeIcon.textContent = '🌞'; // Sun icon for light mode toggle
            }
        }

        applyLightTheme() {
            document.documentElement.style.setProperty('--primary-color', '#2563eb');
            document.documentElement.style.setProperty('--text-primary', '#111827');
            document.documentElement.style.setProperty('--text-secondary', '#6b7280');
            document.documentElement.style.setProperty('--bg-primary', '#ffffff');
            document.documentElement.style.setProperty('--bg-secondary', '#f9fafb');
            document.documentElement.style.setProperty('--bg-card', '#ffffff');
            document.documentElement.style.setProperty('--border-light', '#e5e7eb');
            
            if (themeIcon) {
                themeIcon.textContent = '🌙'; // Moon icon for dark mode toggle
            }
        }

        loadSavedTheme() {
            const savedTheme = localStorage.getItem('portfolio-theme');
            if (savedTheme) {
                this.isDark = savedTheme === 'dark';
            }
        }
    }

    // ===== INITIALIZE CONTROLLERS =====
    document.addEventListener('DOMContentLoaded', () => {
        new NavbarController();
        new AnimationController();
        new ThemeController();
    });

})();

        setupTypingEffect() {
            const titleLines = $$('.title-line');
            
            titleLines.forEach((line, index) => {
                const text = line.textContent;
                line.textContent = '';
                line.style.opacity = '1';
                
                setTimeout(() => {
                    let charIndex = 0;
                    const typeInterval = setInterval(() => {
                        line.textContent += text[charIndex];
                        charIndex++;
                        
                        if (charIndex >= text.length) {
                            clearInterval(typeInterval);
                        }
                    }, 100);
                }, index * 1000);
            });
        }
    }

    // ===== FORM HANDLING =====
    class FormController {
        constructor() {
            this.init();
        }

        init() {
            this.setupContactForm();
            this.setupFormValidation();
        }

        setupContactForm() {
            contactForm?.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(e.target);
            });
        }

        handleFormSubmission(form) {
            const formData = new FormData(form);
            const submitButton = form.querySelector('.form-submit');
            const originalText = submitButton.textContent;
            
            // Show loading state
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate form submission (replace with actual endpoint)
            setTimeout(() => {
                this.showFormFeedback('success', 'Message sent successfully!');
                form.reset();
                
                // Reset button
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        }

        showFormFeedback(type, message) {
            // Remove existing feedback
            const existingFeedback = $('.form-feedback');
            existingFeedback?.remove();
            
            // Create feedback element
            const feedback = document.createElement('div');
            feedback.className = `form-feedback ${type}`;
            feedback.textContent = message;
            feedback.style.cssText = `
                margin-top: 1rem;
                padding: 0.75rem;
                border-radius: 8px;
                font-weight: 500;
                text-align: center;
                background: ${type === 'success' ? '#10b981' : '#ef4444'};
                color: white;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            contactForm.appendChild(feedback);
            
            // Animate in
            requestAnimationFrame(() => {
                feedback.style.opacity = '1';
            });
            
            // Remove after 5 seconds
            setTimeout(() => {
                feedback.style.opacity = '0';
                setTimeout(() => feedback.remove(), 300);
            }, 5000);
        }

        setupFormValidation() {
            const inputs = $$('.form-input, .form-textarea');
            
            inputs.forEach(input => {
                input.addEventListener('blur', () => {
                    this.validateInput(input);
                });
                
                input.addEventListener('input', () => {
                    this.clearInputError(input);
                });
            });
        }

        validateInput(input) {
            const value = input.value.trim();
            const type = input.type;
            let isValid = true;
            let errorMessage = '';
            
            // Basic validation
            if (input.required && !value) {
                isValid = false;
                errorMessage = 'This field is required';
            } else if (type === 'email' && value && !this.isValidEmail(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
            
            if (!isValid) {
                this.showInputError(input, errorMessage);
            } else {
                this.clearInputError(input);
            }
            
            return isValid;
        }

        showInputError(input, message) {
            this.clearInputError(input);
            
            const errorElement = document.createElement('div');
            errorElement.className = 'input-error';
            errorElement.textContent = message;
            errorElement.style.cssText = `
                color: #ef4444;
                font-size: 0.875rem;
                margin-top: 0.25rem;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            input.parentNode.appendChild(errorElement);
            input.style.borderColor = '#ef4444';
            
            requestAnimationFrame(() => {
                errorElement.style.opacity = '1';
            });
        }

        clearInputError(input) {
            const errorElement = input.parentNode.querySelector('.input-error');
            errorElement?.remove();
            input.style.borderColor = '';
        }

        isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
    }

    // ===== THEME CONTROLLER =====
    class ThemeController {
        constructor() {
            this.currentTheme = localStorage.getItem('portfolio-theme') || 'light';
            this.init();
        }

        init() {
            this.applyTheme(this.currentTheme);
            this.createThemeToggle();
        }

        createThemeToggle() {
            const themeToggle = document.createElement('button');
            themeToggle.className = 'theme-toggle';
            themeToggle.innerHTML = this.currentTheme === 'light' ? '🌙' : '☀️';
            themeToggle.style.cssText = `
                position: fixed;
                bottom: 2rem;
                right: 2rem;
                width: 3rem;
                height: 3rem;
                border-radius: 50%;
                border: none;
                background: var(--primary-color);
                color: white;
                font-size: 1.2rem;
                cursor: pointer;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                transition: transform 0.3s ease;
                z-index: 1000;
            `;
            
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
            
            themeToggle.addEventListener('mouseenter', () => {
                themeToggle.style.transform = 'scale(1.1)';
            });
            
            themeToggle.addEventListener('mouseleave', () => {
                themeToggle.style.transform = 'scale(1)';
            });
            
            document.body.appendChild(themeToggle);
        }

        toggleTheme() {
            this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
            this.applyTheme(this.currentTheme);
            localStorage.setItem('portfolio-theme', this.currentTheme);
            
            const toggle = $('.theme-toggle');
            toggle.innerHTML = this.currentTheme === 'light' ? '🌙' : '☀️';
        }

        applyTheme(theme) {
            document.documentElement.setAttribute('data-theme', theme);
        }
    }

    // ===== PERFORMANCE OPTIMIZATION =====
    class PerformanceOptimizer {
        constructor() {
            this.init();
        }

        init() {
            this.setupLazyLoading();
            this.prefetchResources();
            this.optimizeAnimations();
        }

        setupLazyLoading() {
            // Lazy load images when they come into view
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            $$('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }

        prefetchResources() {
            // Prefetch critical resources
            const criticalResources = [
                'css/style.css',
                'js/script.js'
            ];

            criticalResources.forEach(resource => {
                const link = document.createElement('link');
                link.rel = 'prefetch';
                link.href = resource;
                document.head.appendChild(link);
            });
        }

        optimizeAnimations() {
            // Reduce animations on low-performance devices
            if (window.navigator.hardwareConcurrency < 4) {
                document.documentElement.style.setProperty('--transition', 'none');
                document.documentElement.style.setProperty('--transition-fast', 'none');
            }
        }
    }

    // ===== INITIALIZATION =====
    class PortfolioApp {
        constructor() {
            this.init();
        }

        init() {
            // Wait for DOM to be fully loaded
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => {
                    this.initializeComponents();
                });
            } else {
                this.initializeComponents();
            }
        }

        initializeComponents() {
            try {
                // Initialize all controllers
                new NavbarController();
                new AnimationController();
                new FormController();
                new ThemeController();
                new PerformanceOptimizer();
                
                console.log('Portfolio initialized successfully! 🚀');
            } catch (error) {
                console.error('Error initializing portfolio:', error);
            }
        }
    }

    // ===== START APPLICATION =====
    new PortfolioApp();

})();