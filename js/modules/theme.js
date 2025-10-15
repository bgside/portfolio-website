/**
 * Theme Management Module
 * Handles light/dark theme switching and persistence
 */

class ThemeController {
    constructor() {
        this.isDark = true;
        this.themeToggle = DOM.$('#theme-toggle');
        this.themeIcon = DOM.$('.theme-icon');
        this.init();
    }

    init() {
        this.loadSavedTheme();
        this.applyTheme();
        this.setupEventListeners();
    }

    setupEventListeners() {
        DOM.on(this.themeToggle, 'click', () => {
            this.toggleTheme();
        });
    }

    toggleTheme() {
        this.isDark = !this.isDark;
        this.applyTheme();
        this.saveThemePreference();

        // Add rotation animation to theme toggle button
        if (this.themeToggle) {
            this.themeToggle.style.transform = 'rotate(180deg) scale(1.1)';
            setTimeout(() => {
                this.themeToggle.style.transform = 'rotate(0deg) scale(1)';
            }, CONFIG.ANIMATIONS.duration.normal);
        }
    }

    applyTheme() {
        const root = document.documentElement;

        if (this.isDark) {
            this.applyDarkTheme(root);
        } else {
            this.applyLightTheme(root);
        }

        // Update theme toggle icon
        this.updateThemeIcon();
    }

    applyDarkTheme(root) {
        root.style.setProperty('--primary-color', CONFIG.THEMES.colors.primary);
        root.style.setProperty('--text-primary', '#ffffff');
        root.style.setProperty('--text-secondary', '#b8bcc8');
        root.style.setProperty('--bg-primary', 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)');
        root.style.setProperty('--bg-secondary', '#1e293b');
        root.style.setProperty('--bg-card', 'rgba(30, 41, 59, 0.8)');
        root.style.setProperty('--border-light', 'rgba(148, 163, 184, 0.2)');
    }

    applyLightTheme(root) {
        root.style.setProperty('--primary-color', '#2563eb');
        root.style.setProperty('--text-primary', '#111827');
        root.style.setProperty('--text-secondary', '#6b7280');
        root.style.setProperty('--bg-primary', 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)');
        root.style.setProperty('--bg-secondary', '#f1f5f9');
        root.style.setProperty('--bg-card', 'rgba(255, 255, 255, 0.9)');
        root.style.setProperty('--border-light', 'rgba(226, 232, 240, 0.8)');
    }

    updateThemeIcon() {
        if (this.themeIcon) {
            this.themeIcon.textContent = this.isDark ? '🌞' : '🌙';
        }
    }

    loadSavedTheme() {
        const savedTheme = Storage.get(CONFIG.THEMES.storageKey);
        if (savedTheme !== null) {
            this.isDark = savedTheme;
        } else {
            // Check system preference
            this.isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
    }

    saveThemePreference() {
        Storage.set(CONFIG.THEMES.storageKey, this.isDark);
    }

    getCurrentTheme() {
        return this.isDark ? 'dark' : 'light';
    }
}

// Export for use in other modules
window.ThemeController = ThemeController;
