/**
 * Particle System Component
 * Creates and manages animated background particles
 */

class ParticleSystem {
    constructor() {
        this.particles = [];
        this.particleContainer = DOM.$('#hero-particles');
        this.isRunning = false;
        this.init();
    }

    init() {
        if (!this.particleContainer) return;

        this.createParticles();
        this.animateParticles();
        this.isRunning = true;
    }

    createParticles() {
        // Create initial batch of particles
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                this.createParticle();
            }, i * 300);
        }
    }

    createParticle() {
        if (!this.particleContainer) return;

        const particle = DOM.create('div', {
            className: 'particle',
            style: `
                left: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 10}s;
                animation-duration: ${10 + Math.random() * 10}s;
            `
        });

        this.particleContainer.appendChild(particle);
        this.particles.push(particle);

        // Remove particle after animation completes
        setTimeout(() => {
            this.removeParticle(particle);
        }, 20000); // 20 seconds max
    }

    removeParticle(particle) {
        if (particle && particle.parentNode) {
            particle.style.opacity = '0';
            particle.style.transform = 'scale(0)';

            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
                this.particles = this.particles.filter(p => p !== particle);
            }, 300);
        }
    }

    animateParticles() {
        if (!this.isRunning) return;

        // Create new particles periodically
        setInterval(() => {
            if (this.particles.length < 25) { // Limit total particles
                this.createParticle();
            }
        }, 2500);

        // Cleanup old particles
        setInterval(() => {
            if (this.particles.length > 20) {
                const oldParticle = this.particles.shift();
                this.removeParticle(oldParticle);
            }
        }, 5000);
    }

    // Public methods for external control
    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.animateParticles();
        }
    }

    stop() {
        this.isRunning = false;

        // Remove all particles
        this.particles.forEach(particle => {
            this.removeParticle(particle);
        });
        this.particles = [];
    }

    setIntensity(intensity) {
        // Adjust particle creation rate based on intensity (0-1)
        const baseInterval = 2500;
        const newInterval = Math.max(500, baseInterval * (2 - intensity));

        // This would require stopping and restarting the interval
        // For now, just adjust the maximum particle count
        this.maxParticles = Math.floor(10 + intensity * 20);
    }

    destroy() {
        this.stop();
        if (this.particleContainer) {
            this.particleContainer.innerHTML = '';
        }
    }
}

// Export for use in other modules
window.ParticleSystem = ParticleSystem;
