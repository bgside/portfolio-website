/**
 * Navigation Controller Module
 * Handles navigation functionality, smooth scrolling, and mobile menu
 */

class NavbarController {
    constructor() {
        this.navbar = DOM.$('#navbar');
        this.hamburger = DOM.$('#hamburger');
        this.navMenu = DOM.$('#nav-menu');
        this.navLinks = DOM.$$('.nav-link');
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
        const handleScrollEvent = Performance.throttle(() => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop > 100 && !this.isScrolled) {
                this.navbar.style.background = 'rgba(10, 10, 10, 0.95)';
                this.navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
                this.isScrolled = true;
            } else if (scrollTop <= 100 && this.isScrolled) {
                this.navbar.style.background = 'rgba(10, 10, 10, 0.9)';
                this.navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
                this.isScrolled = false;
            }
        }, CONFIG.PERFORMANCE.throttleLimit);

        DOM.on(window, 'scroll', handleScrollEvent);
    }

    handleMobileMenu() {
        DOM.on(this.hamburger, 'click', () => {
            this.navMenu.classList.toggle('active');
            this.hamburger.classList.toggle('active');

            // Animate hamburger lines
            const spans = this.hamburger.querySelectorAll('span');
            spans.forEach((span, index) => {
                span.style.transform = this.navMenu.classList.contains('active')
                    ? this.getHamburgerTransform(index)
                    : 'none';
            });
        });

        // Close mobile menu when clicking on a link
        this.navLinks.forEach(link => {
            DOM.on(link, 'click', () => {
                this.navMenu.classList.remove('active');
                this.hamburger.classList.remove('active');

                const spans = this.hamburger.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = 'none';
                });
            });
        });

        // Close mobile menu when clicking outside
        DOM.on(document, 'click', (e) => {
            if (!this.navbar.contains(e.target) && this.navMenu.classList.contains('active')) {
                this.navMenu.classList.remove('active');
                this.hamburger.classList.remove('active');

                const spans = this.hamburger.querySelectorAll('span');
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
        this.navLinks.forEach(link => {
            DOM.on(link, 'click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = DOM.$(targetId);

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
        const sections = DOM.$$('section[id]');

        const highlightSection = Performance.throttle(() => {
            const scrollPos = window.pageYOffset + 150;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                const correspondingLink = DOM.$(`.nav-link[href="#${sectionId}"]`);

                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    this.navLinks.forEach(link => link.classList.remove('active'));
                    correspondingLink?.classList.add('active');
                }
            });
        }, CONFIG.PERFORMANCE.throttleLimit);

        DOM.on(window, 'scroll', highlightSection);
    }
}

// Export for use in other modules
window.NavbarController = NavbarController;
