/**
 * Service Worker for Portfolio Website
 * Provides offline functionality and caching strategies
 */

const CACHE_NAME = 'portfolio-v1.0.0';
const STATIC_CACHE = 'portfolio-static-v1.0.0';
const DYNAMIC_CACHE = 'portfolio-dynamic-v1.0.0';

// Resources to cache immediately
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/css/main.css',
    '/js/main.js',
    '/js/core/config.js',
    '/js/utils/helpers.js',
    '/manifest.json',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');

    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then((cache) => {
                console.log('Service Worker: Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                console.log('Service Worker: Static assets cached');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('Service Worker: Failed to cache static assets', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activating...');

    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            console.log('Service Worker: Deleting old cache', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('Service Worker: Activated');
                return self.clients.claim();
            })
    );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }

    // Skip external requests (except fonts and critical CDN resources)
    if (url.origin !== location.origin && !isCriticalExternalResource(url)) {
        return;
    }

    event.respondWith(
        cacheFirst(request)
            .catch(() => networkFirst(request))
            .catch(() => offlineFallback(request))
    );
});

// Cache first strategy for static assets
async function cacheFirst(request) {
    const cache = await caches.open(STATIC_CACHE);
    const cached = await cache.match(request);

    if (cached) {
        return cached;
    }

    try {
        const response = await fetch(request);
        if (response.ok) {
            cache.put(request, response.clone());
        }
        return response;
    } catch (error) {
        throw error;
    }
}

// Network first strategy for dynamic content
async function networkFirst(request) {
    try {
        const response = await fetch(request);
        if (response.ok) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, response.clone());
        }
        return response;
    } catch (error) {
        const cache = await caches.open(DYNAMIC_CACHE);
        const cached = await cache.match(request);

        if (cached) {
            return cached;
        }

        throw error;
    }
}

// Offline fallback
async function offlineFallback(request) {
    const url = new URL(request.url);

    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
        const cache = await caches.open(STATIC_CACHE);
        return cache.match('/index.html');
    }

    // Return a generic offline response for other requests
    return new Response('Offline', {
        status: 503,
        statusText: 'Service Unavailable',
        headers: new Headers({
            'Content-Type': 'text/plain'
        })
    });
}

// Check if external resource is critical (fonts, etc.)
function isCriticalExternalResource(url) {
    const criticalDomains = [
        'fonts.googleapis.com',
        'fonts.gstatic.com'
    ];

    return criticalDomains.some(domain => url.hostname.includes(domain));
}

// Background sync for form submissions
self.addEventListener('sync', (event) => {
    if (event.tag === 'contact-form') {
        event.waitUntil(syncContactForm());
    }
});

async function syncContactForm() {
    // Handle background sync for contact form submissions
    console.log('Service Worker: Background sync for contact form');
}

// Push notification handling
self.addEventListener('push', (event) => {
    if (!event.data) return;

    const data = event.data.json();
    const options = {
        body: data.body,
        icon: '/images/profile-photo.jpg',
        badge: '/images/profile-photo.jpg',
        vibrate: [200, 100, 200],
        data: data.url,
        actions: [
            {
                action: 'open',
                title: 'Open',
                icon: '/images/profile-photo.jpg'
            },
            {
                action: 'close',
                title: 'Close'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    if (event.action === 'open') {
        event.waitUntil(
            clients.openWindow(event.notification.data || '/')
        );
    }
});

// Message handling from main thread
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
