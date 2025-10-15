/*
 * Copyright (c) 2025 Hayat
 *
 * SPDX-License-Identifier: GPL-3.0-or-later OR LicenseRef-Hayat-Commercial
 *
 * EXAMPLE Configuration file for contact form functionality
 * 
 * INSTRUCTIONS:
 * 1. Copy this file to config.js
 * 2. Replace the placeholder values with your actual credentials
 * 3. DO NOT commit config.js to version control!
 */

const ContactConfig = {
    // ================================
    // EMAILJS CONFIGURATION
    // ================================
    emailjs: {
        publicKey: 'YOUR_EMAILJS_PUBLIC_KEY',        // Get from https://www.emailjs.com/
        serviceId: 'YOUR_EMAILJS_SERVICE_ID',         // Your email service ID
        templateId: 'YOUR_EMAILJS_TEMPLATE_ID',       // Your email template ID
        maxInitAttempts: 20,
        checkInterval: 100
    },

    // ================================
    // CONTACT INFORMATION
    // ================================
    contact: {
        email: 'your-email@example.com'               // Your contact email
    },

    // ================================
    // FORM ELEMENT IDS
    // ================================
    elements: {
        formId: 'contactForm',
        statusId: 'formStatus',
        inputs: {
            name: 'name',
            email: 'email',
            subject: 'subject',
            message: 'message',
            copy: 'copy'
        }
    },

    // ================================
    // VALIDATION RULES
    // ================================
    validation: {
        minNameLength: 2,
        minMessageLength: 10,
        minFormTime: 3000,
        emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },

    // ================================
    // UI CONFIGURATION
    // ================================
    ui: {
        statusDisplayDuration: 10000,
        statusFadeDuration: 300,
        confetti: {
            count: 50,
            duration: 4000,
            stagger: 30,
            colors: ['#00d4ff', '#0099ff', '#ff0080', '#00ff88', '#ffaa00']
        }
    },

    // ================================
    // AUTOSAVE CONFIGURATION
    // ================================
    autosave: {
        debounceTime: 1000,
        storageKey: 'contactFormDraft',
        clearDelay: 2000
    },

    // ================================
    // SPAM PROTECTION
    // ================================
    spam: {
        honeypotFieldName: 'website'
    },

    // ================================
    // MESSAGES
    // ================================
    messages: {
        success: '✅ Message sent successfully! I\'ll get back to you soon.',
        errors: {
            emailjsNotReady: 'EmailJS is not initialized. Please refresh the page and try again.',
            emailjsLoadFailed: 'EmailJS failed to load after maximum attempts',
            formNotFound: 'Contact form not found!',
            statusNotFound: 'Form status element not found!',
            submitButtonNotFound: 'Submit button not found',
            invalidSubmission: 'Invalid submission detected.',
            tooQuick: 'Please take your time filling out the form.',
            generic: 'Something went wrong.',
            fallback: 'Please try again or email me directly at'
        },
        validation: {
            name: 'Please enter a valid name (at least {min} characters)',
            email: 'Please enter a valid email address',
            subject: 'Please select a subject',
            message: 'Please enter a message (at least {min} characters)'
        },
        loading: '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>'
    },

    // ================================
    // CSS CLASSES
    // ================================
    classes: {
        confetti: 'confetti',
        formStatus: 'form-status',
        btnSubmit: 'btn-submit',
        errorType: 'error',
        successType: 'success'
    }
};

// Make config available globally
if (typeof window !== 'undefined') {
    window.ContactConfig = ContactConfig;
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContactConfig;
}