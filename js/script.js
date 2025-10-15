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

    // ===== PROJECT LOADING AND FILTERING SYSTEM =====
    class ProjectController {
        constructor() {
            this.filterButtons = $$('.filter-btn');
            this.projectsContainer = $('.projects-grid');
            this.projectsData = null;
            this.filteredProjects = [];
            this.currentFilter = 'all';
            this.isLoading = false;
            this.init();
        }

        async init() {
            await this.loadProjectsData();
            this.setupFilterButtons();
            this.applyFilter('all');
        }

        async loadProjectsData() {
            if (this.isLoading) return;

            this.isLoading = true;
            this.showLoadingState();

            try {
                const response = await fetch('./project-list.json');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                this.projectsData = data;
                this.generateProjectCards();
                this.hideLoadingState();

            } catch (error) {
                console.error('Error loading projects data:', error);
                this.showErrorState();
            } finally {
                this.isLoading = false;
            }
        }

        generateProjectCards() {
            if (!this.projectsData || !this.projectsContainer) return;

            // Clear existing projects (remove hardcoded ones)
            this.projectsContainer.innerHTML = '';

            // Flatten all projects from categories
            const allProjects = [];
            Object.values(this.projectsData.projects).forEach(categoryProjects => {
                allProjects.push(...categoryProjects);
            });

            // Sort projects by priority
            allProjects.sort((a, b) => (a.priority || 999) - (b.priority || 999));

            // Generate cards for each project
            allProjects.forEach((project, index) => {
                setTimeout(() => {
                    const projectCard = this.createProjectCard(project);
                    this.projectsContainer.appendChild(projectCard);
                }, index * 50); // Stagger animation
            });
        }

        createProjectCard(project) {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.setAttribute('data-categories', this.getProjectCategories(project));
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';

            const technologies = project.technologies || [];
            const tags = this.generateTags(technologies, project);

            card.innerHTML = `
                <div class="project-image">
                    <div class="project-placeholder ${this.getProjectTypeClass(project.name)}"></div>
                </div>
                <div class="project-content">
                    <h3 class="project-title">${this.escapeHtml(project.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()))}</h3>
                    <p class="project-description">${this.escapeHtml(project.description)}</p>
                    <div class="project-tags">
                        ${tags}
                    </div>
                    <div class="project-links">
                        ${this.generateProjectLinks(project)}
                    </div>
                </div>
            `;

            // Animate in after creation
            setTimeout(() => {
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);

            return card;
        }

        getProjectCategories(project) {
            const categories = [];

            // Map project technologies and names to filter categories
            const techStack = (project.technologies || []).join(' ').toLowerCase();
            const name = project.name.toLowerCase();

            if (techStack.includes('python') && (techStack.includes('ai') || techStack.includes('ml') || techStack.includes('tensorflow'))) {
                categories.push('ai-ml');
            }
            if (techStack.includes('network') || name.includes('network') || name.includes('sdn') || name.includes('vlan') ||
                name.includes('topology') || name.includes('qos') || name.includes('wireless') || name.includes('cisco')) {
                categories.push('networking');
            }
            if (techStack.includes('kubernetes') || techStack.includes('docker') || name.includes('infrastructure') ||
                name.includes('automation') || name.includes('gitops') || name.includes('iac') || name.includes('vmware') ||
                name.includes('proxmox') || name.includes('ansible')) {
                categories.push('infrastructure');
            }
            if (techStack.includes('security') || name.includes('security') || name.includes('sase') ||
                name.includes('vulnerability') || name.includes('penetration')) {
                categories.push('security');
            }
            if (techStack.includes('php') || techStack.includes('laravel') || techStack.includes('vue') ||
                techStack.includes('html') || techStack.includes('css') || techStack.includes('javascript') ||
                name.includes('cms') || name.includes('web')) {
                categories.push('web-dev');
            }

            return categories.join(' ');
        }

        generateTags(technologies, project) {
            const tags = [];

            // Add technology tags
            technologies.slice(0, 4).forEach(tech => {
                tags.push(`<span class="tag">${this.escapeHtml(tech)}</span>`);
            });

            // Add category-based tags
            const categories = this.getProjectCategories(project);
            if (categories.includes('ai-ml')) tags.push('<span class="tag">AI/ML</span>');
            if (categories.includes('networking')) tags.push('<span class="tag">Networking</span>');
            if (categories.includes('infrastructure')) tags.push('<span class="tag">Infrastructure</span>');
            if (categories.includes('security')) tags.push('<span class="tag">Security</span>');
            if (categories.includes('web-dev')) tags.push('<span class="tag">Web Development</span>');

            return tags.join('');
        }

        generateProjectLinks(project) {
            // For now, most projects won't have live demos, so we'll primarily link to GitHub
            // This can be enhanced later with actual project URLs
            const githubUrl = `https://github.com/bgside/${project.name}`;

            return `<a href="${githubUrl}" class="project-link" target="_blank">GitHub</a>`;
        }

        getProjectTypeClass(projectName) {
            const name = projectName.toLowerCase();

            if (name.includes('ai') || name.includes('ml') || name.includes('analytics')) return 'ai';
            if (name.includes('network') || name.includes('sdn') || name.includes('cisco')) return 'network';
            if (name.includes('security') || name.includes('vulnerability')) return 'security';
            if (name.includes('web') || name.includes('cms') || name.includes('laravel')) return 'webdev';
            if (name.includes('infrastructure') || name.includes('automation') || name.includes('iac')) return 'infrastructure';
            if (name.includes('iot') || name.includes('device')) return 'iot';
            if (name.includes('kubernetes') || name.includes('docker')) return 'devops';

            return 'default';
        }

        escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }

        showLoadingState() {
            if (this.projectsContainer) {
                this.projectsContainer.innerHTML = `
                    <div class="loading-state" style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                        <div class="loading-spinner" style="width: 40px; height: 40px; border: 4px solid #333; border-top: 4px solid #ff6b35; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px;"></div>
                        <p>Loading projects...</p>
                    </div>
                `;
            }
        }

        hideLoadingState() {
            const loadingState = this.projectsContainer?.querySelector('.loading-state');
            if (loadingState) {
                loadingState.remove();
            }
        }

        showErrorState() {
            if (this.projectsContainer) {
                this.projectsContainer.innerHTML = `
                    <div class="error-state" style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #ff6b35;">
                        <div class="error-icon" style="font-size: 48px; margin-bottom: 20px;">⚠️</div>
                        <h3>Failed to Load Projects</h3>
                        <p>Unable to load project data. Please try refreshing the page.</p>
                        <button onclick="location.reload()" style="margin-top: 20px; padding: 10px 20px; background: #ff6b35; color: white; border: none; border-radius: 5px; cursor: pointer;">Retry</button>
                    </div>
                `;
            }
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
            if (this.currentFilter === filter || !this.projectsData) return;

            this.currentFilter = filter;

            // Update active button
            this.filterButtons.forEach(btn => btn.classList.remove('active'));
            const activeButton = $(`.filter-btn[data-filter="${filter}"]`);
            if (activeButton) {
                activeButton.classList.add('active');
            }

            // Clear current projects
            if (this.projectsContainer) {
                this.projectsContainer.innerHTML = '';
            }

            // Filter and regenerate projects
            const allProjects = [];
            Object.values(this.projectsData.projects).forEach(categoryProjects => {
                allProjects.push(...categoryProjects);
            });

            // Filter projects based on category
            let filteredProjects = allProjects;
            if (filter !== 'all') {
                filteredProjects = allProjects.filter(project => {
                    const categories = this.getProjectCategories(project);
                    return categories.includes(filter);
                });
            }

            // Sort by priority
            filteredProjects.sort((a, b) => (a.priority || 999) - (b.priority || 999));

            // Show filtered projects
            filteredProjects.forEach((project, index) => {
                setTimeout(() => {
                    const projectCard = this.createProjectCard(project);
                    this.projectsContainer?.appendChild(projectCard);
                }, index * 50);
            });

            // Show message if no projects found
            if (filteredProjects.length === 0) {
                this.showNoProjectsMessage(filter);
            }
        }

        showNoProjectsMessage(filter) {
            if (this.projectsContainer) {
                this.projectsContainer.innerHTML = `
                    <div class="no-projects-state" style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #888;">
                        <div class="no-projects-icon" style="font-size: 48px; margin-bottom: 20px;">🔍</div>
                        <h3>No Projects Found</h3>
                        <p>No projects match the "${filter}" filter. Try selecting a different category.</p>
                    </div>
                `;
            }
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
        new ProjectController();
        new ParticleSystem();
    });

})();
