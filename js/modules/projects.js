/**
 * Enhanced Project Management System
 * Handles project loading, filtering, searching, and display
 */

class ProjectController {
    constructor() {
        this.filterButtons = DOM.$$('.filter-btn');
        this.projectsContainer = DOM.$('.projects-grid');
        this.searchInput = null; // Will be created if needed
        this.projectsData = null;
        this.filteredProjects = [];
        this.currentFilter = 'all';
        this.searchTerm = '';
        this.isLoading = false;
        this.cache = new Map();
        this.cacheTimeout = CONFIG.PROJECTS.cacheTimeout;

        this.init();
    }

    async init() {
        this.createSearchInterface();
        await this.loadProjectsData();
        this.setupFilterButtons();
        this.setupSearchFunctionality();
        this.applyFilter('all');
    }

    createSearchInterface() {
        const searchContainer = DOM.create('div', {
            className: 'project-search-container',
            style: 'margin-bottom: 2rem; text-align: center;'
        });

        const searchInput = DOM.create('input', {
            type: 'text',
            className: 'project-search-input',
            placeholder: 'Search projects by name, technology, or description...',
            style: `
                padding: 1rem 1.5rem;
                width: 100%;
                max-width: 500px;
                border: 2px solid var(--border-light);
                border-radius: 25px;
                background: var(--bg-card);
                color: var(--text-primary);
                font-size: 1rem;
                transition: var(--transition);
            `
        });

        const projectFilters = DOM.$('.project-filters');
        if (projectFilters) {
            projectFilters.insertBefore(searchContainer, projectFilters.firstChild);
            searchContainer.appendChild(searchInput);
            this.searchInput = searchInput;
        }
    }

    async loadProjectsData() {
        if (this.isLoading) return;

        this.isLoading = true;
        this.showLoadingState();

        try {
            // Check cache first
            const cacheKey = 'projects-data';
            const cachedData = this.getCachedData(cacheKey);

            if (cachedData) {
                this.projectsData = cachedData;
                this.generateProjectCards();
                this.hideLoadingState();
                return;
            }

            // Load fresh data
            const data = await Network.fetchWithTimeout(CONFIG.API.projects, {}, 5000);
            this.projectsData = data;

            // Cache the data
            this.setCachedData(cacheKey, data);

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

        // Clear existing projects
        this.projectsContainer.innerHTML = '';

        // Flatten all projects from categories
        const allProjects = [];
        Object.values(this.projectsData.projects).forEach(categoryProjects => {
            allProjects.push(...categoryProjects);
        });

        // Apply search filter if exists
        let projectsToShow = this.searchTerm
            ? this.filterProjectsBySearch(allProjects)
            : allProjects;

        // Sort projects by priority
        projectsToShow.sort((a, b) => (a.priority || 999) - (b.priority || 999));

        // Generate cards for each project
        projectsToShow.forEach((project, index) => {
            setTimeout(() => {
                const projectCard = this.createProjectCard(project);
                this.projectsContainer.appendChild(projectCard);
            }, index * CONFIG.PROJECTS.animationStagger);
        });
    }

    createProjectCard(project) {
        const card = DOM.create('div', {
            className: 'project-card',
            dataset: {
                categories: this.getProjectCategories(project).join(' ')
            }
        });

        const technologies = project.technologies || [];
        const tags = this.generateTags(technologies, project);

        card.innerHTML = `
            <div class="project-image">
                <div class="project-placeholder ${this.getProjectTypeClass(project.name)}"></div>
            </div>
            <div class="project-content">
                <h3 class="project-title">${StringUtils.escapeHtml(StringUtils.kebabToTitle(project.name))}</h3>
                <p class="project-description">${StringUtils.escapeHtml(project.description)}</p>
                <div class="project-tags">
                    ${tags}
                </div>
                <div class="project-links">
                    ${this.generateProjectLinks(project)}
                </div>
            </div>
        `;

        // Add animation
        this.animateProjectCard(card);

        return card;
    }

    animateProjectCard(card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';

        // Animate in after creation
        setTimeout(() => {
            card.style.transition = `opacity ${CONFIG.ANIMATIONS.duration.normal}ms ease, transform ${CONFIG.ANIMATIONS.duration.normal}ms ease`;
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100);

        // Add hover effects
        DOM.on(card, 'mouseenter', () => {
            card.style.transform = 'translateY(-20px) rotateX(5deg)';
        });

        DOM.on(card, 'mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0deg)';
        });
    }

    getProjectCategories(project) {
        const categories = [];
        const techStack = (project.technologies || []).join(' ').toLowerCase();
        const name = project.name.toLowerCase();

        // Map technologies and names to filter categories
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

        return categories;
    }

    generateTags(technologies, project) {
        const tags = [];

        // Add technology tags (limit to 4)
        technologies.slice(0, 4).forEach(tech => {
            tags.push(`<span class="tag">${StringUtils.escapeHtml(tech)}</span>`);
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
        const githubUrl = `https://github.com/bgside/${project.name}`;

        return `
            <a href="${githubUrl}" class="project-link" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-github"></i> View Source
            </a>
        `;
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

    setupFilterButtons() {
        this.filterButtons.forEach(button => {
            DOM.on(button, 'click', (e) => {
                e.preventDefault();
                const filter = button.getAttribute('data-filter');
                this.applyFilter(filter);
            });
        });
    }

    setupSearchFunctionality() {
        if (!this.searchInput) return;

        const debouncedSearch = Performance.debounce((term) => {
            this.searchTerm = term;
            this.generateProjectCards();
        }, CONFIG.PROJECTS.searchDebounceDelay);

        DOM.on(this.searchInput, 'input', (e) => {
            debouncedSearch(e.target.value);
        });
    }

    filterProjectsBySearch(projects) {
        if (!this.searchTerm) return projects;

        const term = this.searchTerm.toLowerCase();

        return projects.filter(project => {
            const name = project.name.toLowerCase();
            const description = project.description.toLowerCase();
            const technologies = (project.technologies || []).join(' ').toLowerCase();

            return name.includes(term) ||
                   description.includes(term) ||
                   technologies.includes(term);
        });
    }

    applyFilter(filter) {
        if (this.currentFilter === filter || !this.projectsData) return;

        this.currentFilter = filter;

        // Update active button
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        const activeButton = DOM.$(`.filter-btn[data-filter="${filter}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }

        // Regenerate projects with current search term
        this.generateProjectCards();

        // Show message if no projects found
        setTimeout(() => {
            if (this.projectsContainer && this.projectsContainer.children.length === 0) {
                this.showNoProjectsMessage(filter);
            }
        }, 100);
    }

    showNoProjectsMessage(filter) {
        if (this.projectsContainer) {
            this.projectsContainer.innerHTML = `
                <div class="no-projects-state">
                    <div class="no-projects-icon">🔍</div>
                    <h3>No Projects Found</h3>
                    <p>No projects match the current filter and search criteria.</p>
                    <button class="btn btn-secondary" onclick="window.projectController.resetFilters()">
                        Reset Filters
                    </button>
                </div>
            `;
        }
    }

    resetFilters() {
        this.searchTerm = '';
        if (this.searchInput) {
            this.searchInput.value = '';
        }
        this.applyFilter('all');
    }

    showLoadingState() {
        if (this.projectsContainer) {
            this.projectsContainer.innerHTML = `
                <div class="loading-state">
                    <div class="loading-spinner"></div>
                    <p>Loading amazing projects...</p>
                </div>
            `;
        }
    }

    hideLoadingState() {
        const loadingState = this.projectsContainer?.querySelector('.loading-state');
        if (loadingState) {
            AnimationUtils.fadeOut(loadingState, CONFIG.ANIMATIONS.duration.fast);
        }
    }

    showErrorState() {
        if (this.projectsContainer) {
            this.projectsContainer.innerHTML = `
                <div class="error-state">
                    <div class="error-icon">⚠️</div>
                    <h3>Failed to Load Projects</h3>
                    <p>Unable to load project data. Please try refreshing the page.</p>
                    <button class="btn btn-primary" onclick="window.projectController.loadProjectsData()">
                        Retry
                    </button>
                </div>
            `;
        }
    }

    // Cache management
    getCachedData(key) {
        const cached = this.cache.get(key);
        if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
            return cached.data;
        }
        this.cache.delete(key);
        return null;
    }

    setCachedData(key, data) {
        this.cache.set(key, {
            data: data,
            timestamp: Date.now()
        });
    }

    clearCache() {
        this.cache.clear();
    }
}

// Export for use in other modules
window.ProjectController = ProjectController;
