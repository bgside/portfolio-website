/**
 * SEO Enhancement Service
 * Handles advanced SEO optimization, meta tags, and social media integration
 */

class SEOService {
    constructor() {
        this.currentUrl = window.location.href;
        this.canonicalUrl = this.getCanonicalUrl();
        this.init();
    }

    init() {
        this.enhanceMetaTags();
        this.addStructuredData();
        this.setupSocialMediaTags();
        this.addThemeColor();
        this.setupRobotsDirectives();
        this.monitorSEOChanges();
    }

    enhanceMetaTags() {
        const head = document.head;

        // Enhanced description
        this.updateMetaTag('description', CONFIG.SEO.defaultDescription);

        // Enhanced keywords
        this.updateMetaTag('keywords', CONFIG.SEO.defaultKeywords);

        // Author information
        this.updateMetaTag('author', CONFIG.APP.author);

        // Language and locale
        this.updateMetaTag('language', 'English');
        document.documentElement.setAttribute('lang', 'en');

        // Enhanced robots directive
        this.updateMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');

        // Google bot specific
        this.addMetaTag('googlebot', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');

        // Bing bot specific
        this.addMetaTag('bingbot', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');

        // Enhanced viewport
        this.updateMetaTag('viewport', 'width=device-width, initial-scale=1.0, viewport-fit=cover');

        // Mobile optimization
        this.addMetaTag('mobile-web-app-capable', 'yes');
        this.addMetaTag('apple-mobile-web-app-capable', 'yes');
        this.addMetaTag('apple-mobile-web-app-status-bar-style', 'black-translucent');

        // Prevent zoom on input focus (iOS)
        this.addMetaTag('format-detection', 'telephone=no');

        // Enhanced Open Graph
        this.enhanceOpenGraphTags();

        // Enhanced Twitter Cards
        this.enhanceTwitterCardTags();
    }

    enhanceOpenGraphTags() {
        const ogData = {
            'og:type': 'website',
            'og:url': this.canonicalUrl,
            'og:title': CONFIG.SEO.defaultTitle,
            'og:description': CONFIG.SEO.defaultDescription,
            'og:image': CONFIG.SEO.ogImage,
            'og:image:alt': 'Ali Emad SALEH - IT Infrastructure Expert Portfolio',
            'og:image:width': '1200',
            'og:image:height': '630',
            'og:site_name': CONFIG.APP.name,
            'og:locale': 'en_US',
            'article:author': CONFIG.APP.author,
            'article:section': 'Technology',
            'article:tag': 'IT Infrastructure',
            'article:tag': 'Network Management',
            'article:tag': 'System Administration'
        };

        Object.entries(ogData).forEach(([property, content]) => {
            this.updateMetaProperty(property, content);
        });
    }

    enhanceTwitterCardTags() {
        const twitterData = {
            'twitter:card': 'summary_large_image',
            'twitter:site': CONFIG.SEO.twitterHandle,
            'twitter:creator': CONFIG.SEO.twitterHandle,
            'twitter:url': this.canonicalUrl,
            'twitter:title': CONFIG.SEO.defaultTitle,
            'twitter:description': CONFIG.SEO.defaultDescription,
            'twitter:image': CONFIG.SEO.ogImage,
            'twitter:image:alt': 'Ali Emad SALEH - IT Infrastructure Expert Portfolio'
        };

        Object.entries(twitterData).forEach(([name, content]) => {
            this.updateMetaName(name, content);
        });
    }

    addStructuredData() {
        // Remove existing structured data
        const existingStructuredData = document.querySelector('script[type="application/ld+json"]');
        if (existingStructuredData) {
            existingStructuredData.remove();
        }

        // Enhanced structured data
        const structuredData = {
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "Person",
                    "@id": `${this.canonicalUrl}#person`,
                    "name": "Ali Emad SALEH",
                    "jobTitle": "IT Infrastructure Expert & Full-Stack Developer",
                    "description": CONFIG.SEO.defaultDescription,
                    "url": this.canonicalUrl,
                    "sameAs": [
                        "https://github.com/bgside",
                        "https://linkedin.com/in/hex41414141",
                        "mailto:bgside2368@gmail.com"
                    ],
                    "knowsAbout": [
                        "IT Infrastructure",
                        "Network Management",
                        "System Administration",
                        "Cloud-Native Solutions",
                        "DevOps",
                        "Full-Stack Development",
                        "PHP",
                        "Laravel",
                        "Python",
                        "Go",
                        "Kubernetes",
                        "Docker"
                    ],
                    "hasOccupation": {
                        "@type": "Occupation",
                        "name": "IT Infrastructure Expert",
                        "occupationLocation": {
                            "@type": "Country",
                            "name": "Syria"
                        },
                        "skills": "System Administration, Network Management, Cloud-Native Solutions, Full-Stack Development, DevOps, Kubernetes, Docker, PHP, Laravel, Python, Go"
                    }
                },
                {
                    "@type": "WebSite",
                    "@id": `${this.canonicalUrl}#website`,
                    "url": this.canonicalUrl,
                    "name": CONFIG.APP.name,
                    "description": CONFIG.APP.description,
                    "inLanguage": "en-US"
                },
                {
                    "@type": "WebPage",
                    "@id": `${this.canonicalUrl}#webpage`,
                    "url": this.canonicalUrl,
                    "name": CONFIG.SEO.defaultTitle,
                    "isPartOf": { "@id": `${this.canonicalUrl}#website` },
                    "about": { "@id": `${this.canonicalUrl}#person` },
                    "description": CONFIG.SEO.defaultDescription,
                    "inLanguage": "en-US",
                    "potentialAction": {
                        "@type": "ReadAction",
                        "target": [this.canonicalUrl]
                    }
                }
            ]
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(structuredData, null, 2);
        document.head.appendChild(script);
    }

    setupSocialMediaTags() {
        // LinkedIn specific
        this.addMetaProperty('linkedin:owner', 'hex41414141');

        // Facebook specific
        this.addMetaProperty('fb:app_id', 'your-facebook-app-id'); // Replace with actual FB app ID

        // Pinterest
        this.addMetaName('pinterest-rich-pin', 'true');
    }

    addThemeColor() {
        // Remove existing theme color
        const existingThemeColor = document.querySelector('meta[name="theme-color"]');
        if (existingThemeColor) {
            existingThemeColor.remove();
        }

        this.addMetaTag('theme-color', CONFIG.THEMES.colors.primary);
    }

    setupRobotsDirectives() {
        // Add robots.txt directives as meta tags
        this.addMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large');

        // Prevent indexing of development environment
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            this.addMetaTag('robots', 'noindex, nofollow');
        }
    }

    monitorSEOChanges() {
        // Monitor title changes
        const titleObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' || mutation.type === 'characterData') {
                    this.updateSocialTags();
                }
            });
        });

        titleObserver.observe(document.querySelector('title'), {
            childList: true,
            characterData: true,
            subtree: true
        });

        // Monitor meta description changes
        const metaObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'content') {
                    this.updateSocialTags();
                }
            });
        });

        const descriptionMeta = document.querySelector('meta[name="description"]');
        if (descriptionMeta) {
            metaObserver.observe(descriptionMeta, { attributes: true });
        }
    }

    updateSocialTags() {
        // Update Open Graph and Twitter tags when content changes
        const title = document.title || CONFIG.SEO.defaultTitle;
        const description = document.querySelector('meta[name="description"]')?.content || CONFIG.SEO.defaultDescription;

        this.updateMetaProperty('og:title', title);
        this.updateMetaName('twitter:title', title);
        this.updateMetaProperty('og:description', description);
        this.updateMetaName('twitter:description', description);
    }

    // Utility methods
    updateMetaTag(name, content) {
        let metaTag = document.querySelector(`meta[name="${name}"]`);
        if (metaTag) {
            metaTag.setAttribute('content', content);
        } else {
            this.addMetaTag(name, content);
        }
    }

    addMetaTag(name, content) {
        const meta = document.createElement('meta');
        meta.name = name;
        meta.content = content;
        document.head.appendChild(meta);
    }

    updateMetaProperty(property, content) {
        let metaTag = document.querySelector(`meta[property="${property}"]`);
        if (metaTag) {
            metaTag.setAttribute('content', content);
        } else {
            this.addMetaProperty(property, content);
        }
    }

    addMetaProperty(property, content) {
        const meta = document.createElement('meta');
        meta.setAttribute('property', property);
        meta.content = content;
        document.head.appendChild(meta);
    }

    updateMetaName(name, content) {
        let metaTag = document.querySelector(`meta[name="${name}"]`);
        if (metaTag) {
            metaTag.setAttribute('content', content);
        } else {
            this.addMetaName(name, content);
        }
    }

    addMetaName(name, content) {
        const meta = document.createElement('meta');
        meta.name = name;
        meta.content = content;
        document.head.appendChild(meta);
    }

    getCanonicalUrl() {
        return window.location.origin + window.location.pathname;
    }

    // Public methods for dynamic updates
    updateTitle(newTitle) {
        document.title = newTitle;
        this.updateSocialTags();
    }

    updateDescription(newDescription) {
        this.updateMetaTag('description', newDescription);
        this.updateSocialTags();
    }

    addCustomMetaTag(name, content) {
        this.addMetaTag(name, content);
    }

    trackPageView(pagePath) {
        // Future analytics integration
        if (CONFIG.FEATURES.enableAnalytics) {
            console.log('Page view tracked:', pagePath);
        }
    }
}

// Export for use in other modules
window.SEOService = SEOService;
