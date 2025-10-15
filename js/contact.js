/*
 * Copyright (c) 2025 Hayat
 *
 * SPDX-License-Identifier: GPL-3.0-or-later OR LicenseRef-Hayat-Commercial
 *
 * This file is part of <ProjectName>.
 *
 * You may use this file under the terms of either the GNU General Public
 * License v3.0 (or later), or the Hayat Commercial License.
 *
 * For the full text of these licenses, see the LICENSE.md and
 * COMMERCIAL-LICENSE.md files in the root directory of this repository.
 */

// ================================
// CONTACT FORM FUNCTIONALITY
// ================================

(function() {
    'use strict';

    console.log('🚀 Contact script loaded');

    // Check if config is loaded
    if (typeof ContactConfig === 'undefined') {
        console.error('❌ ContactConfig not found! Make sure config.js is loaded before contact.js');
        return;
    }

    const config = ContactConfig;

    // ================================
    // WAIT FOR EMAILJS TO LOAD
    // ================================
    
    let emailJsReady = false;

    const initEmailJS = () => {
        return new Promise((resolve, reject) => {
            let attempts = 0;

            const checkEmailJS = setInterval(() => {
                attempts++;
                console.log(`Checking for EmailJS... attempt ${attempts}`);

                if (typeof emailjs !== 'undefined') {
                    clearInterval(checkEmailJS);
                    try {
                        emailjs.init(config.emailjs.publicKey);
                        emailJsReady = true;
                        console.log('✅ EmailJS initialized successfully');
                        resolve();
                    } catch (error) {
                        console.error('❌ EmailJS init error:', error);
                        reject(error);
                    }
                } else if (attempts >= config.emailjs.maxInitAttempts) {
                    clearInterval(checkEmailJS);
                    console.error(`❌ ${config.messages.errors.emailjsLoadFailed}`);
                    reject(new Error(config.messages.errors.emailjsLoadFailed));
                }
            }, config.emailjs.checkInterval);
        });
    };

    // ================================
    // VARIABLES
    // ================================

    const contactForm = document.getElementById(config.elements.formId);
    const formStatus = document.getElementById(config.elements.statusId);

    if (!contactForm) {
        console.error(`❌ ${config.messages.errors.formNotFound}`);
        return;
    }

    console.log('✅ Contact form found');

    if (!formStatus) {
        console.error(`❌ ${config.messages.errors.statusNotFound}`);
    }

    // ================================
    // FORM VALIDATION
    // ================================

    const validateEmail = (email) => {
        return config.validation.emailRegex.test(String(email).toLowerCase());
    };

    const validateForm = (formData) => {
        const errors = [];
        const { validation, messages } = config;

        if (!formData.name || formData.name.trim().length < validation.minNameLength) {
            errors.push(messages.validation.name.replace('{min}', validation.minNameLength));
        }

        if (!formData.email || !validateEmail(formData.email)) {
            errors.push(messages.validation.email);
        }

        if (!formData.subject || formData.subject === '') {
            errors.push(messages.validation.subject);
        }

        if (!formData.message || formData.message.trim().length < validation.minMessageLength) {
            errors.push(messages.validation.message.replace('{min}', validation.minMessageLength));
        }

        return errors;
    };

    // ================================
    // EMAILJS SEND FUNCTION
    // ================================

    const sendEmailViaEmailJS = (formData) => {
        console.log('📧 Attempting to send email via EmailJS...');
        console.log('Form data:', formData);

        if (!emailJsReady) {
            throw new Error(config.messages.errors.emailjsNotReady);
        }

        const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message,
            reply_to: formData.email
        };

        console.log('Template params:', templateParams);

        return emailjs.send(
            config.emailjs.serviceId,
            config.emailjs.templateId,
            templateParams
        ).then(
            (response) => {
                console.log('✅ Email sent successfully!', response);
                return response;
            },
            (error) => {
                console.error('❌ Email send failed:', error);
                throw error;
            }
        );
    };

    // ================================
    // FORM SUBMISSION
    // ================================

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log('📝 Form submitted');

        const { inputs } = config.elements;

        // Get form data
        const formData = {
            name: document.getElementById(inputs.name).value,
            email: document.getElementById(inputs.email).value,
            subject: document.getElementById(inputs.subject).value,
            message: document.getElementById(inputs.message).value,
            copy: document.getElementById(inputs.copy).checked
        };

        console.log('Collected form data:', formData);

        // Validate form
        const errors = validateForm(formData);

        if (errors.length > 0) {
            console.warn('⚠️ Validation errors:', errors);
            showFormStatus(config.classes.errorType, errors.join('<br>'));
            return;
        }

        console.log('✅ Form validation passed');

        // Show loading state
        const submitButton = contactForm.querySelector(`.${config.classes.btnSubmit}`);
        if (!submitButton) {
            console.error(`❌ ${config.messages.errors.submitButtonNotFound}`);
            return;
        }

        const originalButtonText = submitButton.innerHTML;
        submitButton.innerHTML = config.messages.loading;
        submitButton.disabled = true;

        try {
            console.log('🚀 Sending email...');
            
            // Check if EmailJS is ready
            if (!emailJsReady) {
                throw new Error(config.messages.errors.emailjsNotReady);
            }

            await sendEmailViaEmailJS(formData);

            console.log('✅ Success!');
            showFormStatus(config.classes.successType, config.messages.success);
            contactForm.reset();
            createSuccessConfetti();

        } catch (error) {
            console.error('❌ Error during submission:', error);
            
            let errorMessage = `❌ ${config.messages.errors.generic} `;
            
            if (error.text) {
                errorMessage += `Error: ${error.text}. `;
            } else if (error.message) {
                errorMessage += `Error: ${error.message}. `;
            }
            
            errorMessage += `${config.messages.errors.fallback} ${config.contact.email}`;
            
            showFormStatus(config.classes.errorType, errorMessage);
        } finally {
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
        }
    };

    // ================================
    // SHOW FORM STATUS
    // ================================

    const showFormStatus = (type, message) => {
        if (!formStatus) {
            console.error('❌ Cannot show status - element not found');
            alert(message);
            return;
        }

        formStatus.className = `${config.classes.formStatus} ${type}`;
        formStatus.innerHTML = message;
        formStatus.style.display = 'block';

        setTimeout(() => {
            hideFormStatus();
        }, config.ui.statusDisplayDuration);

        formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    };

    const hideFormStatus = () => {
        if (!formStatus) return;
        
        formStatus.style.opacity = '0';
        setTimeout(() => {
            formStatus.style.display = 'none';
            formStatus.style.opacity = '1';
        }, config.ui.statusFadeDuration);
    };

    // ================================
    // SUCCESS CONFETTI
    // ================================

    const createSuccessConfetti = () => {
        const { confetti } = config.ui;

        for (let i = 0; i < confetti.count; i++) {
            setTimeout(() => {
                const confettiElement = document.createElement('div');
                confettiElement.className = config.classes.confetti;
                confettiElement.style.left = Math.random() * 100 + 'vw';
                confettiElement.style.background = confetti.colors[Math.floor(Math.random() * confetti.colors.length)];
                confettiElement.style.animationDuration = (Math.random() * 2 + 2) + 's';
                confettiElement.style.width = (Math.random() * 10 + 5) + 'px';
                confettiElement.style.height = (Math.random() * 10 + 5) + 'px';
                document.body.appendChild(confettiElement);

                setTimeout(() => confettiElement.remove(), confetti.duration);
            }, i * confetti.stagger);
        }
    };

    // ================================
    // REAL-TIME VALIDATION
    // ================================

    const addInputValidation = () => {
        const { inputs } = config.elements;
        const { validation } = config;

        const nameInput = document.getElementById(inputs.name);
        const emailInput = document.getElementById(inputs.email);
        const messageInput = document.getElementById(inputs.message);

        if (nameInput) {
            nameInput.addEventListener('blur', function() {
                if (this.value.trim().length < validation.minNameLength && this.value.length > 0) {
                    this.style.borderColor = 'var(--error-color)';
                } else if (this.value.length > 0) {
                    this.style.borderColor = 'var(--success-color)';
                }
            });

            nameInput.addEventListener('focus', function() {
                this.style.borderColor = 'var(--primary-color)';
            });
        }

        if (emailInput) {
            emailInput.addEventListener('blur', function() {
                if (this.value && !validateEmail(this.value)) {
                    this.style.borderColor = 'var(--error-color)';
                } else if (this.value) {
                    this.style.borderColor = 'var(--success-color)';
                }
            });

            emailInput.addEventListener('focus', function() {
                this.style.borderColor = 'var(--primary-color)';
            });
        }

        if (messageInput) {
            const charCounter = document.createElement('div');
            charCounter.style.cssText = `
                text-align: right;
                font-size: var(--font-size-sm);
                color: var(--text-muted);
                margin-top: 0.25rem;
            `;
            messageInput.parentNode.appendChild(charCounter);

            messageInput.addEventListener('input', function() {
                const length = this.value.length;
                charCounter.textContent = `${length} characters`;

                if (length >= validation.minMessageLength) {
                    charCounter.style.color = 'var(--success-color)';
                } else {
                    charCounter.style.color = 'var(--text-muted)';
                }
            });

            messageInput.addEventListener('blur', function() {
                if (this.value.trim().length < validation.minMessageLength && this.value.length > 0) {
                    this.style.borderColor = 'var(--error-color)';
                } else if (this.value.length > 0) {
                    this.style.borderColor = 'var(--success-color)';
                }
            });

            messageInput.addEventListener('focus', function() {
                this.style.borderColor = 'var(--primary-color)';
            });
        }
    };

    // ================================
    // AUTOSAVE TO LOCAL STORAGE
    // ================================

    const initAutoSave = () => {
        const formInputs = contactForm.querySelectorAll('input:not([type="checkbox"]), textarea, select');
        const { storageKey, clearDelay, debounceTime } = config.autosave;

        const loadSavedData = () => {
            const savedData = localStorage.getItem(storageKey);
            if (savedData) {
                try {
                    const data = JSON.parse(savedData);
                    Object.keys(data).forEach(key => {
                        const input = document.getElementById(key);
                        if (input) {
                            input.value = data[key];
                        }
                    });
                    console.log('📝 Form data restored from autosave');
                } catch (e) {
                    console.error('Error loading saved form data:', e);
                }
            }
        };

        const saveData = () => {
            const data = {};
            formInputs.forEach(input => {
                if (input.id) {
                    data[input.id] = input.value;
                }
            });
            localStorage.setItem(storageKey, JSON.stringify(data));
        };

        const clearSavedData = () => {
            localStorage.removeItem(storageKey);
        };

        formInputs.forEach(input => {
            input.addEventListener('input', debounce(saveData, debounceTime));
        });

        contactForm.addEventListener('submit', () => {
            setTimeout(clearSavedData, clearDelay);
        });

        loadSavedData();
    };

    // ================================
    // DEBOUNCE UTILITY
    // ================================

    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    // ================================
    // KEYBOARD SHORTCUTS
    // ================================

    const initKeyboardShortcuts = () => {
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                if (document.activeElement.tagName === 'TEXTAREA' || 
                    document.activeElement.tagName === 'INPUT') {
                    e.preventDefault();
                    contactForm.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
                }
            }
        });
    };

    // ================================
    // SPAM PROTECTION
    // ================================

    const addSpamProtection = () => {
        const honeypot = document.createElement('input');
        honeypot.type = 'text';
        honeypot.name = config.spam.honeypotFieldName;
        honeypot.style.display = 'none';
        honeypot.tabIndex = -1;
        honeypot.autocomplete = 'off';
        contactForm.appendChild(honeypot);

        let formOpenTime = Date.now();

        contactForm.addEventListener('submit', (e) => {
            if (honeypot.value !== '') {
                e.preventDefault();
                e.stopPropagation();
                console.warn('🚫 Spam detected!');
                showFormStatus(config.classes.errorType, config.messages.errors.invalidSubmission);
                return false;
            }

            const timeSpent = Date.now() - formOpenTime;
            if (timeSpent < config.validation.minFormTime) {
                e.preventDefault();
                e.stopPropagation();
                console.warn('⚠️ Form submitted too quickly!');
                showFormStatus(config.classes.errorType, config.messages.errors.tooQuick);
                return false;
            }
        }, true); // Use capture phase
    };

    // ================================
    // INITIALIZE EVERYTHING
    // ================================

    const init = async () => {
        console.log('🔧 Initializing contact form...');

        try {
            // Wait for EmailJS to load
            await initEmailJS();
            
            // Add event listener
            contactForm.addEventListener('submit', handleFormSubmit);

            // Initialize features
            addInputValidation();
            initAutoSave();
            initKeyboardShortcuts();
            addSpamProtection();

            console.log('✅ Contact form fully initialized and ready!');
            
        } catch (error) {
            console.error('❌ Failed to initialize contact form:', error);
            showFormStatus(
                config.classes.errorType, 
                `⚠️ Contact form initialization failed. Please refresh the page or email me directly at ${config.contact.email}`
            );
        }
    };

    // Start initialization
    init();

    // ================================
    // EXPORT FOR TESTING
    // ================================

    window.contactFormHandler = {
        validate: validateForm,
        validateEmail: validateEmail,
        config: config,
        test: () => {
            console.log('EmailJS ready:', emailJsReady);
            console.log('Form element:', contactForm);
            console.log('Status element:', formStatus);
            console.log('Configuration:', config);
        }
    };

})();