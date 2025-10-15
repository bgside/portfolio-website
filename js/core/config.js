/**
 * Portfolio Website Configuration
 * Centralized configuration management for the entire application
 */

const CONFIG = {
    // Application Settings
    APP: {
        name: 'Ali Emad SALEH Portfolio',
        version: '2.0.0',
        author: 'Ali Emad SALEH',
        description: 'Professional IT Infrastructure & Hardware Hacking Portfolio'
    },

    // Animation Settings
    ANIMATIONS: {
        duration: {
            fast: 200,
            normal: 300,
            slow: 500,
            pageLoad: 800
        },
        easing: {
            default: 'cubic-bezier(0.4, 0, 0.2, 1)',
            bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        },
        stagger: {
            projectCards: 50,
            skillItems: 100,
            timelineItems: 200
        }
    },

    // Performance Settings
    PERFORMANCE: {
        debounceDelay: 300,
        throttleLimit: 16, // ~60fps
        intersectionThreshold: 0.1,
        lazyLoadOffset: '50px'
    },

    // Theme Settings
    THEMES: {
        default: 'dark',
        storageKey: 'portfolio-theme',
        colors: {
            primary: '#6366f1',
            secondary: '#8b5cf6',
            accent: '#06b6d4',
            success: '#10b981',
            warning: '#f59e0b',
            error: '#ef4444'
        }
    },

    // Project Settings
    PROJECTS: {
        itemsPerPage: 12,
        animationStagger: 50,
        filterAnimationDuration: 300,
        searchDebounceDelay: 300,
        cacheTimeout: 5 * 60 * 1000 // 5 minutes
    },

    // Contact Form Settings
    CONTACT: {
        validationDelay: 500,
        submitCooldown: 2000,
        maxMessageLength: 1000,
        honeypotField: 'website'
    },

    // SEO Settings
    SEO: {
        defaultTitle: 'Ali Emad SALEH - IT Infrastructure Expert & Full-Stack Developer',
        defaultDescription: 'Computer Science Engineer & IT Infrastructure Expert with 4+ years experience in system administration, network management, cloud-native solutions, and enterprise application development',
        defaultKeywords: 'IT Infrastructure, Network Management, System Administration, Cloud-Native, DevOps, Full-Stack Developer, PHP, Laravel, Python, Go, Kubernetes, Docker',
        ogImage: 'https://bgside.github.io/portfolio-website/images/profile-photo.jpg',
        twitterHandle: '@hex41414141'
    },

    // API Endpoints
    API: {
        projects: './project-list.json',
        contact: './api/contact.php', // For future backend integration
        analytics: './api/analytics.php' // For future analytics
    },

    // Breakpoints (matching CSS)
    BREAKPOINTS: {
        mobile: 480,
        tablet: 768,
        desktop: 1024,
        large: 1400
    },

    // Feature Flags
    FEATURES: {
        enablePWA: false,
        enableAnalytics: false,
        enableServiceWorker: false,
        enableNotifications: false,
        debugMode: true
    },

    // External URLs
    URLS: {
        github: 'https://github.com/bgside',
        linkedin: 'https://linkedin.com/in/hex41414141',
        email: 'bgside2368@gmail.com',
        cv: './Ali_Emad_SALEH.pdf'
    }
};

// Export for use in other modules
window.CONFIG = CONFIG;
