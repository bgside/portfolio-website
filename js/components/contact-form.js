/**
 * Enhanced Contact Form Component
 * Handles form validation, submission, and user feedback
 */

class ContactForm {
    constructor() {
        this.form = DOM.$('#contact-form');
        this.submitButton = this.form?.querySelector('.form-submit');
        this.inputs = this.form?.querySelectorAll('input, textarea');
        this.honeypot = this.form?.querySelector(`[name="${CONFIG.CONTACT.honeypotField}"]`);
        this.isSubmitting = false;
        this.validationDelay = CONFIG.CONTACT.validationDelay;
        this.submitCooldown = CONFIG.CONTACT.submitCooldown;

        this.init();
    }

    init() {
        if (!this.form) return;

        this.setupEventListeners();
        this.addHoneypotField();
        this.enhanceFormUI();
    }

    setupEventListeners() {
        // Real-time validation
        this.inputs.forEach(input => {
            DOM.on(input, 'input', () => {
                this.validateField(input);
            });

            DOM.on(input, 'blur', () => {
                this.validateField(input, true);
            });
        });

        // Form submission
        DOM.on(this.form, 'submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
    }

    addHoneypotField() {
        if (this.honeypot) return;

        const honeypotInput = DOM.create('input', {
            type: 'text',
            name: CONFIG.CONTACT.honeypotField,
            style: 'display: none; position: absolute; left: -9999px;',
            tabindex: '-1',
            autocomplete: 'off'
        });

        this.form.appendChild(honeypotInput);
    }

    enhanceFormUI() {
        // Add loading state styles
        this.inputs.forEach(input => {
            this.addValidationIndicator(input);
        });
    }

    addValidationIndicator(input) {
        const wrapper = input.parentNode;
        const indicator = DOM.create('div', {
            className: 'validation-indicator',
            style: `
                position: absolute;
                right: 1rem;
                top: 50%;
                transform: translateY(-50%);
                font-size: 1.2rem;
                opacity: 0;
                transition: opacity 0.2s ease;
            `
        });

        wrapper.style.position = 'relative';
        wrapper.appendChild(indicator);

        input.dataset.indicator = 'true';
    }

    validateField(input, showErrors = false) {
        const value = input.value.trim();
        const type = input.type;
        const name = input.name;

        let isValid = true;
        let message = '';

        // Required field validation
        if (input.hasAttribute('required') && !Validation.isNotEmpty(value)) {
            isValid = false;
            message = 'This field is required';
        }

        // Email validation
        if (type === 'email' && value && !Validation.isValidEmail(value)) {
            isValid = false;
            message = 'Please enter a valid email address';
        }

        // Name validation
        if (name === 'name' && value && !Validation.minLength(value, 2)) {
            isValid = false;
            message = 'Name must be at least 2 characters';
        }

        // Subject validation
        if (name === 'subject' && value && !Validation.minLength(value, 5)) {
            isValid = false;
            message = 'Subject must be at least 5 characters';
        }

        // Message validation
        if (name === 'message' && value) {
            if (!Validation.minLength(value, 10)) {
                isValid = false;
                message = 'Message must be at least 10 characters';
            } else if (!Validation.maxLength(value, CONFIG.CONTACT.maxMessageLength)) {
                isValid = false;
                message = `Message must be less than ${CONFIG.CONTACT.maxMessageLength} characters`;
            }
        }

        if (showErrors) {
            this.showFieldError(input, message);
        }

        this.updateFieldIndicator(input, isValid);

        return isValid;
    }

    showFieldError(input, message) {
        // Remove existing error
        const existingError = input.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }

        if (message) {
            const errorElement = DOM.create('div', {
                className: 'field-error',
                textContent: message,
                style: `
                    color: var(--error-color);
                    font-size: 0.875rem;
                    margin-top: 0.5rem;
                    opacity: 0;
                    transition: opacity 0.2s ease;
                `
            });

            input.parentNode.appendChild(errorElement);

            // Animate in
            setTimeout(() => {
                errorElement.style.opacity = '1';
            }, 10);
        }
    }

    updateFieldIndicator(input, isValid) {
        const indicator = input.parentNode.querySelector('.validation-indicator');
        if (!indicator) return;

        if (input.value.trim() === '') {
            indicator.style.opacity = '0';
        } else {
            indicator.textContent = isValid ? '✓' : '⚠';
            indicator.style.color = isValid ? 'var(--success-color)' : 'var(--warning-color)';
            indicator.style.opacity = '1';
        }
    }

    async handleSubmit() {
        if (this.isSubmitting) return;

        // Check honeypot
        if (this.honeypot && this.honeypot.value) {
            console.log('Spam detected');
            return;
        }

        // Validate all fields
        let isFormValid = true;
        this.inputs.forEach(input => {
            if (!this.validateField(input, true)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            this.showFormError('Please correct the errors above');
            return;
        }

        // Submit form
        await this.submitForm();
    }

    async submitForm() {
        this.setSubmittingState(true);
        this.showFormMessage('Sending message...', 'info');

        try {
            const formData = new FormData(this.form);
            const data = Object.fromEntries(formData);

            // Simulate API call (replace with actual endpoint)
            await this.simulateSubmission(data);

            this.showFormMessage('Message sent successfully! Thank you for reaching out.', 'success');
            this.form.reset();

            // Clear validation indicators
            this.inputs.forEach(input => {
                const indicator = input.parentNode.querySelector('.validation-indicator');
                if (indicator) {
                    indicator.style.opacity = '0';
                }
            });

        } catch (error) {
            console.error('Form submission error:', error);
            this.showFormMessage('Failed to send message. Please try again.', 'error');
        } finally {
            this.setSubmittingState(false);
        }
    }

    simulateSubmission(data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate success/failure
                if (Math.random() > 0.1) { // 90% success rate
                    resolve(data);
                } else {
                    reject(new Error('Network error'));
                }
            }, 2000);
        });
    }

    setSubmittingState(isSubmitting) {
        this.isSubmitting = isSubmitting;

        if (this.submitButton) {
            this.submitButton.disabled = isSubmitting;
            this.submitButton.textContent = isSubmitting ? 'Sending...' : 'Send Message';

            if (isSubmitting) {
                this.submitButton.style.opacity = '0.7';
            } else {
                this.submitButton.style.opacity = '1';
            }
        }

        // Disable/enable form inputs
        this.inputs.forEach(input => {
            input.disabled = isSubmitting;
        });
    }

    showFormMessage(message, type = 'info') {
        // Remove existing message
        const existingMessage = this.form.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        const messageElement = DOM.create('div', {
            className: `form-message form-message--${type}`,
            textContent: message,
            style: `
                margin-top: 1rem;
                padding: 1rem;
                border-radius: 8px;
                font-size: 0.875rem;
                font-weight: 500;
                opacity: 0;
                transition: opacity 0.3s ease;
            `
        });

        // Set message color based on type
        switch (type) {
            case 'success':
                messageElement.style.background = 'rgba(16, 185, 129, 0.1)';
                messageElement.style.color = 'var(--success-color)';
                messageElement.style.border = '1px solid var(--success-color)';
                break;
            case 'error':
                messageElement.style.background = 'rgba(239, 68, 68, 0.1)';
                messageElement.style.color = 'var(--error-color)';
                messageElement.style.border = '1px solid var(--error-color)';
                break;
            case 'info':
            default:
                messageElement.style.background = 'rgba(99, 102, 241, 0.1)';
                messageElement.style.color = 'var(--primary-color)';
                messageElement.style.border = '1px solid var(--primary-color)';
                break;
        }

        // Insert before submit button
        this.form.insertBefore(messageElement, this.submitButton);

        // Animate in
        setTimeout(() => {
            messageElement.style.opacity = '1';
        }, 10);

        // Auto-remove success messages after delay
        if (type === 'success') {
            setTimeout(() => {
                AnimationUtils.fadeOut(messageElement, CONFIG.ANIMATIONS.duration.normal);
            }, 5000);
        }
    }

    showFormError(message) {
        this.showFormMessage(message, 'error');

        // Add shake animation to form
        this.form.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            this.form.style.animation = '';
        }, 500);
    }

    resetForm() {
        this.form.reset();

        // Clear validation indicators and messages
        const indicators = this.form.querySelectorAll('.validation-indicator');
        indicators.forEach(indicator => {
            indicator.style.opacity = '0';
        });

        const errors = this.form.querySelectorAll('.field-error');
        errors.forEach(error => error.remove());

        const messages = this.form.querySelectorAll('.form-message');
        messages.forEach(message => message.remove());
    }
}

// Add CSS animation for form shake
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);

// Export for use in other modules
window.ContactForm = ContactForm;
