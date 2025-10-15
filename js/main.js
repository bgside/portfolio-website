/**
 * Main Application Entry Point
 * Initializes all modules and manages the application lifecycle
 */

class PortfolioApp {
    constructor() {
        this.modules = {};
        this.isInitialized = false;
        this.init();
    }

    async init() {
        try {
            console.log('🚀 Initializing Portfolio Website...');

            // Initialize core modules
            await this.initializeModules();

            // Setup global error handling
            this.setupErrorHandling();

            // Setup performance monitoring
            this.setupPerformanceMonitoring();

            // Mark as initialized
            this.isInitialized = true;

            console.log('✅ Portfolio Website initialized successfully');

        } catch (error) {
            console.error('❌ Failed to initialize Portfolio Website:', error);
            this.showInitializationError();
        }
    }

    async initializeModules() {
        try {
            // Initialize core services first
            this.modules.seo = new SEOService();
            this.modules.pwa = new PWAService();

            // Initialize theme controller
            this.modules.theme = new ThemeController();

            // Initialize project controller
            this.modules.projects = new ProjectController();

            // Initialize contact form
            this.modules.contactForm = new ContactForm();

            // Initialize navigation controller
            this.modules.navbar = new NavbarController();

            // Initialize animation controller
            this.modules.animations = new AnimationController();

            // Initialize particle system
            this.modules.particles = new ParticleSystem();

            console.log('✅ All modules initialized successfully');

        } catch (error) {
            console.error('❌ Module initialization failed:', error);
            throw error;
        }
    }

    setupErrorHandling() {
        // Global error handler
        window.addEventListener('error', (event) => {
            console.error('Global error:', event.error);

            if (CONFIG.FEATURES.debugMode) {
                this.showErrorNotification('An error occurred. Check console for details.');
            }
        });

        // Promise rejection handler
        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled promise rejection:', event.reason);

            if (CONFIG.FEATURES.debugMode) {
                this.showErrorNotification('A network error occurred. Please try again.');
            }
        });
    }

    setupPerformanceMonitoring() {
        // Monitor page load performance
        window.addEventListener('load', () => {
            if ('performance' in window) {
                const perfData = performance.getEntriesByType('navigation')[0];

                console.log('📊 Performance Metrics:', {
                    'DNS Lookup': perfData.domainLookupEnd - perfData.domainLookupStart,
                    'TCP Connection': perfData.connectEnd - perfData.connectStart,
                    'Server Response': perfData.responseEnd - perfData.responseStart,
                    'DOM Processing': perfData.domContentLoadedEventEnd - perfData.responseEnd,
                    'Total Load Time': perfData.loadEventEnd - perfData.navigationStart
                });
            }
        });
    }

    showErrorNotification(message) {
        // Create temporary error notification
        const notification = DOM.create('div', {
            className: 'error-notification',
            textContent: message,
            style: `
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--error-color);
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                z-index: 9999;
                opacity: 0;
                transform: translateX(100%);
                transition: all 0.3s ease;
            `
        });

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after delay
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }

    showInitializationError() {
        const errorContainer = DOM.create('div', {
            className: 'init-error',
            innerHTML: `
                <div style="text-align: center; padding: 2rem; color: var(--error-color);">
                    <h2>⚠️ Failed to Load Website</h2>
                    <p>There was an error initializing the website. Please refresh the page.</p>
                    <button onclick="location.reload()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: var(--primary-color); color: white; border: none; border-radius: 4px; cursor: pointer;">Refresh Page</button>
                </div>
            `,
            style: `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: var(--bg-primary);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
            `
        });

        document.body.appendChild(errorContainer);
    }

    // Public API for external access
    getModule(moduleName) {
        return this.modules[moduleName];
    }

    getAllModules() {
        return { ...this.modules };
    }

    isReady() {
        return this.isInitialized;
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Create global app instance
    window.portfolioApp = new PortfolioApp();

    // For backward compatibility, also create individual module instances
    window.themeController = new ThemeController();
    window.projectController = new ProjectController();
    window.contactForm = new ContactForm();
});

// Export for potential future module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioApp;
}
