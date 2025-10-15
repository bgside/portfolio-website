/**
 * Utility Functions for Portfolio Website
 * Common helper functions used across all modules
 */

/**
 * DOM manipulation utilities
 */
const DOM = {
    /**
     * Query selector with error handling
     */
    $(selector) {
        const element = document.querySelector(selector);
        if (!element && CONFIG.FEATURES.debugMode) {
            console.warn(`Element not found: ${selector}`);
        }
        return element;
    },

    /**
     * Query all selector with error handling
     */
    $$(selector) {
        return Array.from(document.querySelectorAll(selector));
    },

    /**
     * Create element with attributes
     */
    create(tag, attributes = {}, content = '') {
        const element = document.createElement(tag);

        Object.entries(attributes).forEach(([key, value]) => {
            if (key === 'className') element.className = value;
            else if (key === 'dataset') {
                Object.entries(value).forEach(([dataKey, dataValue]) => {
                    element.dataset[dataKey] = dataValue;
                });
            } else {
                element.setAttribute(key, value);
            }
        });

        if (content) element.innerHTML = content;
        return element;
    },

    /**
     * Add event listener with error handling
     */
    on(element, event, handler, options = false) {
        if (element) {
            element.addEventListener(event, handler, options);
        }
    },

    /**
     * Remove event listener
     */
    off(element, event, handler, options = false) {
        if (element) {
            element.removeEventListener(event, handler, options);
        }
    }
};

/**
 * Performance utilities
 */
const Performance = {
    /**
     * Throttle function execution
     */
    throttle(func, limit = CONFIG.PERFORMANCE.throttleLimit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    /**
     * Debounce function execution
     */
    debounce(func, delay = CONFIG.PERFORMANCE.debounceDelay) {
        let timeoutId;
        return function(...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    },

    /**
     * Create animation frame throttled function
     */
    animate(fn) {
        return Performance.throttle(fn, 16); // ~60fps
    }
};

/**
 * String utilities
 */
const StringUtils = {
    /**
     * Escape HTML characters
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    /**
     * Capitalize first letter of each word
     */
    capitalize(str) {
        return str.replace(/\b\w/g, l => l.toUpperCase());
    },

    /**
     * Convert kebab-case to Title Case
     */
    kebabToTitle(str) {
        return str
            .split('-')
            .map(word => StringUtils.capitalize(word))
            .join(' ');
    },

    /**
     * Truncate text with ellipsis
     */
    truncate(text, maxLength = 100) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength).trim() + '...';
    }
};

/**
 * Array utilities
 */
const ArrayUtils = {
    /**
     * Shuffle array using Fisher-Yates algorithm
     */
    shuffle(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    },

    /**
     * Chunk array into smaller arrays
     */
    chunk(array, size = 10) {
        const chunks = [];
        for (let i = 0; i < array.length; i += size) {
            chunks.push(array.slice(i, i + size));
        }
        return chunks;
    },

    /**
     * Remove duplicates from array
     */
    unique(array) {
        return [...new Set(array)];
    }
};

/**
 * Animation utilities
 */
const AnimationUtils = {
    /**
     * Fade in element with animation
     */
    fadeIn(element, duration = CONFIG.ANIMATIONS.duration.normal) {
        if (!element) return;

        element.style.opacity = '0';
        element.style.display = 'block';

        const start = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);

            element.style.opacity = progress.toString();

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    },

    /**
     * Fade out element with animation
     */
    fadeOut(element, duration = CONFIG.ANIMATIONS.duration.normal) {
        if (!element) return;

        const start = performance.now();
        const initialOpacity = parseFloat(getComputedStyle(element).opacity);

        const animate = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);

            element.style.opacity = (initialOpacity * (1 - progress)).toString();

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.style.display = 'none';
            }
        };

        requestAnimationFrame(animate);
    },

    /**
     * Slide down animation
     */
    slideDown(element, duration = CONFIG.ANIMATIONS.duration.normal) {
        if (!element) return;

        element.style.height = '0';
        element.style.overflow = 'hidden';
        element.style.display = 'block';

        const targetHeight = element.scrollHeight;
        const start = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);

            element.style.height = (targetHeight * progress) + 'px';

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.style.height = 'auto';
            }
        };

        requestAnimationFrame(animate);
    },

    /**
     * Slide up animation
     */
    slideUp(element, duration = CONFIG.ANIMATIONS.duration.normal) {
        if (!element) return;

        const initialHeight = element.scrollHeight;
        const start = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);

            element.style.height = (initialHeight * (1 - progress)) + 'px';
            element.style.overflow = 'hidden';

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.style.display = 'none';
                element.style.height = 'auto';
            }
        };

        requestAnimationFrame(animate);
    }
};

/**
 * Storage utilities
 */
const Storage = {
    /**
     * Get item from localStorage with error handling
     */
    get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error(`Error reading from localStorage:`, error);
            return defaultValue;
        }
    },

    /**
     * Set item in localStorage with error handling
     */
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error(`Error writing to localStorage:`, error);
            return false;
        }
    },

    /**
     * Remove item from localStorage
     */
    remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error(`Error removing from localStorage:`, error);
            return false;
        }
    }
};

/**
 * Network utilities
 */
const Network = {
    /**
     * Fetch with timeout and error handling
     */
    async fetchWithTimeout(url, options = {}, timeout = 5000) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        try {
            const response = await fetch(url, {
                ...options,
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            clearTimeout(timeoutId);

            if (error.name === 'AbortError') {
                throw new Error(`Request timeout after ${timeout}ms`);
            }

            throw error;
        }
    },

    /**
     * Check if online
     */
    isOnline() {
        return navigator.onLine;
    }
};

/**
 * Validation utilities
 */
const Validation = {
    /**
     * Validate email address
     */
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    /**
     * Validate required field
     */
    isNotEmpty(value) {
        return value && value.trim().length > 0;
    },

    /**
     * Validate minimum length
     */
    minLength(value, min) {
        return value && value.length >= min;
    },

    /**
     * Validate maximum length
     */
    maxLength(value, max) {
        return !value || value.length <= max;
    }
};

/**
 * Export utilities for use in other modules
 */
window.DOM = DOM;
window.Performance = Performance;
window.StringUtils = StringUtils;
window.ArrayUtils = ArrayUtils;
window.AnimationUtils = AnimationUtils;
window.Storage = Storage;
window.Network = Network;
window.Validation = Validation;
