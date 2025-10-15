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

    // ===== PROJECT FILTERING SYSTEM =====
    class ProjectFilterController {
        constructor() {
            this.filterButtons = $$('.filter-btn');
            this.projectCards = $$('.project-card');
            this.currentFilter = 'all';
            this.init();
        }

        init() {
            this.setupFilterButtons();
            this.setupProjectCards();
        }

        setupFilterButtons() {
            this.filterButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    const filter = button.getAttribute('data-filter');
                    this.applyFilter(filter);
                });
            });
        }

        setupProjectCards() {
            this.projectCards.forEach(card => {
                // Add initial fade-in animation
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                
                // Add category data attributes based on tags
                this.categorizeProject(card);
                
                // Animate in after a short delay
                setTimeout(() => {
                    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, Math.random() * 500);
            });
        }

        categorizeProject(card) {
            const tags = card.querySelectorAll('.tag');
            const categories = [];
            
            tags.forEach(tag => {
                const tagText = tag.textContent.toLowerCase();
                
                if (tagText.includes('ai') || tagText.includes('ml') || tagText.includes('tensorflow')) {
                    categories.push('ai-ml');
                }
                if (tagText.includes('network') || tagText.includes('sdn') || tagText.includes('vlan') || 
                    tagText.includes('topology') || tagText.includes('qos') || tagText.includes('wireless')) {
                    categories.push('networking');
                }
                if (tagText.includes('kubernetes') || tagText.includes('docker') || tagText.includes('infrastructure') || 
                    tagText.includes('automation') || tagText.includes('gitops') || tagText.includes('iac')) {
                    categories.push('infrastructure');
                }
                if (tagText.includes('security') || tagText.includes('sase') || tagText.includes('zero trust')) {
                    categories.push('security');
                }
                if (tagText.includes('php') || tagText.includes('laravel') || tagText.includes('vue') || 
                    tagText.includes('html') || tagText.includes('css') || tagText.includes('javascript')) {
                    categories.push('web-dev');
                }
            });
            
            if (categories.length > 0) {
                card.setAttribute('data-categories', categories.join(' '));
            }
        }

        applyFilter(filter) {
            if (this.currentFilter === filter) return;
            
            this.currentFilter = filter;
            
            // Update active button
            this.filterButtons.forEach(btn => btn.classList.remove('active'));
            const activeButton = $(`.filter-btn[data-filter="${filter}"]`);
            if (activeButton) {
                activeButton.classList.add('active');
            }
            
            // Filter projects with animation
            this.projectCards.forEach((card, index) => {
                const categories = card.getAttribute('data-categories') || '';
                const shouldShow = filter === 'all' || categories.includes(filter);
                
                if (shouldShow) {
                    setTimeout(() => {
                        card.style.display = 'block';
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px) scale(0.95)';
                        
                        setTimeout(() => {
                            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0) scale(1)';
                        }, 50);
                    }, index * 100);
                } else {
                    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(-20px) scale(0.95)';
                    
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        }
    }

    // ===== PARTICLE SYSTEM =====
    class ParticleSystem {
        constructor() {
            this.particles = [];
            this.particleContainer = $('#hero-particles');
            this.init();
        }

        init() {
            this.createParticles();
            this.animateParticles();
        }

        createParticles() {
            if (!this.particleContainer) return;

            for (let i = 0; i < 20; i++) {
                setTimeout(() => {
                    this.createParticle();
                }, i * 200);
            }
        }

        createParticle() {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 10 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            
            this.particleContainer.appendChild(particle);
            this.particles.push(particle);

            // Remove particle after animation
            setTimeout(() => {
                particle.remove();
                this.particles = this.particles.filter(p => p !== particle);
            }, 15000);
        }

        animateParticles() {
            setInterval(() => {
                this.createParticle();
            }, 2000);
        }
    }

    // ===== INITIALIZE CONTROLLERS =====
    document.addEventListener('DOMContentLoaded', () => {
        new NavbarController();
        new AnimationController();
        new ThemeController();
        new ProjectFilterController();
        new ParticleSystem();
    });

})();
