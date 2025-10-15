/**
 * Progressive Web App Service
 * Handles service worker registration, caching, and offline functionality
 */

class PWAService {
    constructor() {
        this.serviceWorkerRegistration = null;
        this.isInstallable = false;
        this.isInstalled = false;
        this.installPrompt = null;
        this.cacheName = 'portfolio-v1.0.0';

        this.init();
    }

    init() {
        this.checkInstallability();
        this.registerServiceWorker();
        this.setupInstallPrompt();
        this.setupCacheStrategies();
    }

    async registerServiceWorker() {
        if (!('serviceWorker' in navigator)) {
            console.log('Service Worker not supported');
            return;
        }

        try {
            this.serviceWorkerRegistration = await navigator.serviceWorker.register('/sw.js', {
                scope: '/'
            });

            console.log('Service Worker registered successfully');

            // Listen for updates
            this.serviceWorkerRegistration.addEventListener('updatefound', () => {
                const newWorker = this.serviceWorkerRegistration.installing;
                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        this.showUpdateNotification();
                    }
                });
            });

        } catch (error) {
            console.error('Service Worker registration failed:', error);
        }
    }

    checkInstallability() {
        // Check if the app can be installed
        if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
            this.isInstalled = true;
        }

        // Listen for installability changes
        DOM.on(window, 'beforeinstallprompt', (e) => {
            e.preventDefault();
            this.installPrompt = e;
            this.isInstallable = true;
            this.showInstallButton();
        });

        // Listen for successful installation
        DOM.on(window, 'appinstalled', () => {
            this.isInstalled = true;
            this.hideInstallButton();
            this.showInstallSuccessMessage();
        });
    }

    setupInstallPrompt() {
        // Create install button
        const installButton = DOM.create('button', {
            className: 'pwa-install-btn',
            innerHTML: '<i class="fas fa-download"></i> Install App',
            style: `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: var(--primary-color);
                color: white;
                border: none;
                border-radius: 25px;
                padding: 12px 20px;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                z-index: 1000;
                opacity: 0;
                transform: translateY(100px);
                transition: all 0.3s ease;
            `
        });

        DOM.on(installButton, 'click', () => {
            this.promptInstall();
        });

        document.body.appendChild(installButton);
        this.installButton = installButton;
    }

    async promptInstall() {
        if (!this.installPrompt) return;

        try {
            this.installPrompt.prompt();
            const choiceResult = await this.installPrompt.userChoice;

            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }

            this.installPrompt = null;
            this.hideInstallButton();

        } catch (error) {
            console.error('Install prompt failed:', error);
        }
    }

    showInstallButton() {
        if (this.installButton) {
            this.installButton.style.opacity = '1';
            this.installButton.style.transform = 'translateY(0)';
        }
    }

    hideInstallButton() {
        if (this.installButton) {
            this.installButton.style.opacity = '0';
            this.installButton.style.transform = 'translateY(100px)';
        }
    }

    showInstallSuccessMessage() {
        const notification = DOM.create('div', {
            className: 'install-success',
            innerHTML: '<i class="fas fa-check-circle"></i> App installed successfully!',
            style: `
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--success-color);
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

        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);

        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    showUpdateNotification() {
        const notification = DOM.create('div', {
            className: 'update-notification',
            innerHTML: `
                <div>
                    <i class="fas fa-sync-alt"></i>
                    <span>Update available!</span>
                    <button onclick="window.location.reload()">Refresh</button>
                </div>
            `,
            style: `
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: var(--warning-color);
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                z-index: 9999;
                opacity: 0;
                transition: all 0.3s ease;
            `
        });

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.opacity = '1';
        }, 100);
    }

    setupCacheStrategies() {
        // Setup different caching strategies for different types of resources
        this.setupImageCaching();
        this.setupFontCaching();
        this.setupAPICaching();
    }

    setupImageCaching() {
        // Cache images for offline use
        if ('caches' in window) {
            // Preload critical images
            const criticalImages = [
                'images/profile-photo.jpg',
                // Add other critical images
            ];

            criticalImages.forEach(imageUrl => {
                caches.open(this.cacheName).then(cache => {
                    cache.add(imageUrl).catch(() => {
                        // Image might not exist, that's okay
                    });
                });
            });
        }
    }

    setupFontCaching() {
        // Cache Google Fonts
        const fontUrls = [
            'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
        ];

        if ('caches' in window) {
            caches.open(this.cacheName).then(cache => {
                fontUrls.forEach(url => {
                    cache.add(url).catch(() => {
                        // Font might not be accessible, that's okay
                    });
                });
            });
        }
    }

    setupAPICaching() {
        // Cache API responses
        const apiEndpoints = [
            'project-list.json'
        ];

        apiEndpoints.forEach(endpoint => {
            if ('caches' in window) {
                caches.open(this.cacheName).then(cache => {
                    fetch(endpoint)
                        .then(response => {
                            if (response.ok) {
                                cache.put(endpoint, response);
                            }
                        })
                        .catch(() => {
                            // API might not be available, that's okay
                        });
                });
            }
        });
    }

    // Public methods
    isInstallable() {
        return this.isInstallable;
    }

    isInstalled() {
        return this.isInstalled;
    }

    async clearCache() {
        if ('caches' in window) {
            const cacheNames = await caches.keys();
            await Promise.all(
                cacheNames.map(cacheName => caches.delete(cacheName))
            );
        }
    }

    async getCacheSize() {
        if ('caches' in window) {
            const cacheNames = await caches.keys();
            let totalSize = 0;

            for (const cacheName of cacheNames) {
                const cache = await caches.open(cacheName);
                const requests = await cache.keys();

                for (const request of requests) {
                    try {
                        const response = await cache.match(request);
                        if (response) {
                            const blob = await response.blob();
                            totalSize += blob.size;
                        }
                    } catch (e) {
                        // Skip this request
                    }
                }
            }

            return totalSize;
        }
        return 0;
    }
}

// Export for use in other modules
window.PWAService = PWAService;
