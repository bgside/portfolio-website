/**
 * Animation Controller Module
 * Handles scroll animations, intersection observers, and visual effects
 */

class AnimationController {
    constructor() {
        this.observerOptions = {
            threshold: CONFIG.PERFORMANCE.intersectionThreshold,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupCounterAnimation();
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

                    if (entry.target.classList.contains('timeline-item')) {
                        this.animateTimelineItem(entry.target);
                    }
                }
            });
        }, this.observerOptions);

        // Observe elements for animation
        const animateElements = DOM.$$('.skill-category, .timeline-item, .project-card');
        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `opacity ${CONFIG.ANIMATIONS.duration.normal}ms ease, transform ${CONFIG.ANIMATIONS.duration.normal}ms ease`;
            observer.observe(el);
        });
    }

    animateSkillBars(element) {
        // Add skill bar animations if needed
        const skillItems = element.querySelectorAll('.skill-list li');

        skillItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.transform = 'translateX(0)';
                item.style.opacity = '1';
            }, index * 100);
        });
    }

    animateTimelineItem(element) {
        // Add timeline-specific animations
        const marker = element.querySelector('.timeline-marker');
        const content = element.querySelector('.timeline-content');

        if (marker) {
            marker.style.animation = 'pulse 2s ease-in-out infinite';
        }
    }

    setupCounterAnimation() {
        const counters = DOM.$$('.highlight-number');

        const animateCounter = (counter) => {
            const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
            const duration = 2000;
            const start = performance.now();
            const initialValue = 0;

            const animate = (currentTime) => {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);

                // Easing function for smooth animation
                const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                const currentValue = Math.floor(initialValue + (target - initialValue) * easeOutExpo);

                // Preserve suffix (like +)
                const suffix = counter.textContent.replace(/[\d]/g, '');
                counter.textContent = currentValue + suffix;

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };

            requestAnimationFrame(animate);
        };

        // Trigger counter animations when they come into view
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.animated) {
                    animateCounter(entry.target);
                    entry.target.dataset.animated = 'true';
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    // Public methods for external control
    animateElement(element, animationType = 'fadeIn') {
        switch (animationType) {
            case 'fadeIn':
                AnimationUtils.fadeIn(element);
                break;
            case 'slideDown':
                AnimationUtils.slideDown(element);
                break;
            case 'slideUp':
                AnimationUtils.slideUp(element);
                break;
        }
    }

    staggerAnimation(elements, delay = 100) {
        elements.forEach((element, index) => {
            setTimeout(() => {
                AnimationUtils.fadeIn(element);
            }, index * delay);
        });
    }
}

// Export for use in other modules
window.AnimationController = AnimationController;
