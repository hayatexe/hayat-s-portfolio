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

// Your actual code starts below this line
// e.g., package com.mycompany.app;

// ================================
// GSAP ANIMATIONS & SCROLL TRIGGERS
// ================================

(function() {
    'use strict';

    // Check if GSAP is loaded
    if (typeof gsap === 'undefined') {
        console.warn('GSAP not loaded. Animations will be disabled.');
        return;
    }

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // ================================
    // CONFIGURATION
    // ================================

    const config = {
        ease: 'power3.out',
        duration: 1,
        stagger: 0.2,
        scrollTriggerDefaults: {
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    };

    // ================================
    // PAGE LOAD ANIMATIONS
    // ================================

    const initPageLoadAnimations = () => {
        // Navbar animation
        gsap.from('.navbar', {
            y: -100,
            opacity: 0,
            duration: 0.8,
            ease: config.ease
        });

        // Hero section animations
        if (document.querySelector('.hero-greeting')) {
            gsap.from('.hero-greeting', {
                x: -50,
                opacity: 0,
                duration: 0.8,
                delay: 0.3,
                ease: config.ease
            });

            gsap.from('.hero-title', {
                y: 50,
                opacity: 0,
                duration: 0.8,
                delay: 0.5,
                ease: config.ease
            });

            gsap.from('.hero-roles', {
                y: 30,
                opacity: 0,
                duration: 0.8,
                delay: 0.7,
                ease: config.ease
            });

            gsap.from('.hero-description', {
                y: 30,
                opacity: 0,
                duration: 0.8,
                delay: 0.9,
                ease: config.ease
            });

            gsap.from('.hero-cta .btn', {
                y: 30,
                opacity: 0,
                duration: 0.8,
                delay: 1.1,
                stagger: 0.2,
                ease: config.ease
            });

            gsap.from('.hero-socials a', {
                opacity: 1,
                visibility: 'visible',
                scale: 1,
            });

            gsap.from('.hero-socials a', {
                scale: 0,
                duration: 0.5,
                delay: 1.3,
                stagger: 0.1,
                ease: 'back.out(1.7)',
                onStart: function() {
                    // Ensure they're visible when animation starts
                    gsap.set('.hero-socials a', {opacity: 1, visibility: 'visible'});
                }
            });

            gsap.from('.profile-container', {
                scale: 0.5,
                opacity: 0,
                rotation: 180,
                duration: 1,
                delay: 0.5,
                ease: 'back.out(1.4)'
            });

            gsap.from('.scroll-indicator', {
                y: -20,
                opacity: 0,
                duration: 0.8,
                delay: 1.5,
                ease: config.ease
            });
        }

        // Page header animation for other pages
        if (document.querySelector('.page-header')) {
            gsap.from('.page-title', {
                y: 50,
                opacity: 0,
                duration: 0.8,
                delay: 0.3,
                ease: config.ease
            });

            gsap.from('.page-subtitle', {
                y: 30,
                opacity: 0,
                duration: 0.8,
                delay: 0.5,
                ease: config.ease
            });
        }
    };

    // ================================
    // STATS SECTION ANIMATION
    // ================================

    const animateStatsSection = () => {
    const statCards = gsap.utils.toArray('.stat-card');

    if (statCards.length > 0) {
        // Set initial state to visible
        gsap.set(statCards, {
            opacity: 1,
            visibility: 'visible',
            y: 0
        });
        
        // Optional: Add gentle animation on scroll
        gsap.from(statCards, {
            scrollTrigger: {
                trigger: '.stats-section',
                start: 'top 70%',
                toggleActions: 'play none none none',
                once: true
            },
            scale: 0.95,
            duration: 0.6,
            stagger: 0.15,
            ease: config.ease
        });
    }
};
    // ================================
    // FEATURED SECTION ANIMATION
    // ================================

    const animateFeaturedSection = () => {
        const featuredCards = gsap.utils.toArray('.featured-card');

        if (featuredCards.length > 0) {
            featuredCards.forEach((card, index) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    },
                    y: 60,
                    opacity: 0,
                    rotation: index % 2 === 0 ? -5 : 5,
                    duration: 0.8,
                    ease: config.ease
                });
            });
        }
    };

    // ================================
    // QUOTE SECTION ANIMATION
    // ================================

    const animateQuoteSection = () => {
        if (document.querySelector('.quote-block')) {
            gsap.from('.quote-icon', {
                scrollTrigger: {
                    trigger: '.quote-section',
                    start: 'top 70%',
                    toggleActions: 'play none none reverse'
                },
                scale: 0,
                rotation: 180,
                opacity: 0,
                duration: 0.8,
                ease: 'back.out(1.7)'
            });

            gsap.from('.quote-text', {
                scrollTrigger: {
                    trigger: '.quote-section',
                    start: 'top 70%',
                    toggleActions: 'play none none reverse'
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                delay: 0.3,
                ease: config.ease
            });

            gsap.from('.quote-author', {
                scrollTrigger: {
                    trigger: '.quote-section',
                    start: 'top 70%',
                    toggleActions: 'play none none reverse'
                },
                y: 20,
                opacity: 0,
                duration: 0.8,
                delay: 0.5,
                ease: config.ease
            });
        }
    };

    // ================================
    // ABOUT PAGE ANIMATIONS
    // ================================

    const animateAboutPage = () => {
        // About image animation
        if (document.querySelector('.about-profile-image')) {
            gsap.from('.about-profile-image', {
                scrollTrigger: {
                    trigger: '.about-intro',
                    start: 'top 70%',
                    toggleActions: 'play none none reverse'
                },
                scale: 0.8,
                opacity: 0,
                rotation: -10,
                duration: 1,
                ease: 'back.out(1.4)'
            });
        }

        // Bio text animation
        const bioParas = gsap.utils.toArray('.bio-text p');
        if (bioParas.length > 0) {
            gsap.from(bioParas, {
                scrollTrigger: {
                    trigger: '.bio-text',
                    start: 'top 70%',
                    toggleActions: 'play none none reverse'
                },
                x: -50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: config.ease
            });
        }

        // Personality tags animation
        const tags = gsap.utils.toArray('.personality-tags .tag');
        if (tags.length > 0) {
            // Set to visible first
            gsap.set(tags, {
                opacity: 1,
                visibility: 'visible',
                display: 'inline-block'
            });
        
            // Then animate (optional gentle animation)
            gsap.from(tags, {
                scrollTrigger: {
                        trigger: '.personality-tags',
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                },
                y: 10,
                duration: 0.5,
                stagger: 0.1,
                ease: 'back.out(1.7)'
            });
        }

        // Interest cards animation
        const interestCards = gsap.utils.toArray('.interest-card');
        if (interestCards.length > 0) {
            interestCards.forEach(card => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    },
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    ease: config.ease
                });
            });
        }

        // Fun facts animation
        const factCards = gsap.utils.toArray('.fact-card');
        if (factCards.length > 0) {
            factCards.forEach((card, index) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    },
                    x: index % 2 === 0 ? -50 : 50,
                    opacity: 0,
                    duration: 0.8,
                    ease: config.ease
                });
            });
        }
    };

    // ================================
    // PROJECTS PAGE ANIMATIONS
    // ================================

    const animateProjectsPage = () => {
        const projectCards = gsap.utils.toArray('.project-card');

        if (projectCards.length > 0) {
            projectCards.forEach((card, index) => {
                // Card entrance
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    },
                    y: 80,
                    opacity: 0,
                    duration: 1,
                    ease: config.ease
                });

                // Project tech tags
                // Project tech tags (safe)
                const techTags = card.querySelectorAll('.tech-tag');
                if (techTags.length > 0) {
                    // önce görünür hale getir
                    gsap.set(techTags, { opacity: 1, visibility: 'visible', scale: 1 });

                    // sonra hafif bir giriş animasyonu (opasiteyi tekrar 0'a çekmeden)
                    gsap.from(techTags, {
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 70%',
                            toggleActions: 'play none none none'
                        },
                        y: 8,
                        duration: 0.4,
                        stagger: 0.05,
                        delay: 0.2,
                        ease: 'power2.out'
                    });
                }
            });
        }

        // Coming soon cards
        const comingSoonCards = gsap.utils.toArray('.coming-soon-card');
        if (comingSoonCards.length > 0) {
            comingSoonCards.forEach(card => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    },
                    scale: 0.8,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'back.out(1.4)'
                });
            });
        }
    };

    // ================================
    // SKILLS PAGE ANIMATIONS
    // ================================

    const animateSkillsPage = () => {
        // Skill cards animation
        const skillCards = gsap.utils.toArray('.skill-card');
        if (skillCards.length > 0) {
            skillCards.forEach(card => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    },
                    y: 50,
                    opacity: 0,
                    duration: 0.6,
                    ease: config.ease
                });

                // Skill icon animation
                const icon = card.querySelector('.skill-icon');
                if (icon) {
                    gsap.from(icon, {
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse'
                        },
                        scale: 0,
                        rotation: 180,
                        opacity: 0,
                        duration: 0.8,
                        delay: 0.2,
                        ease: 'back.out(1.7)'
                    });
                }
            });
        }

        // Tech cards animation
        const techCards = gsap.utils.toArray('.tech-card');
        if (techCards.length > 0) {
            techCards.forEach(card => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    },
                    scale: 0.8,
                    opacity: 0,
                    duration: 0.6,
                    ease: 'back.out(1.4)'
                });
            });
        }

        // Specialized cards animation
        const specializedCards = gsap.utils.toArray('.specialized-card');
        if (specializedCards.length > 0) {
            specializedCards.forEach((card, index) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    },
                    x: index % 2 === 0 ? -50 : 50,
                    opacity: 0,
                    duration: 0.8,
                    ease: config.ease
                });
            });
        }

        // Soft skill cards animation
        const softSkillCards = gsap.utils.toArray('.soft-skill-card');
        if (softSkillCards.length > 0) {
            softSkillCards.forEach(card => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    },
                    y: 40,
                    opacity: 0,
                    duration: 0.6,
                    ease: config.ease
                });
            });
        }
    };

    // ================================
    // EXPERIENCE PAGE ANIMATIONS
    // ================================

    const animateExperiencePage = () => {
        // Timeline items animation
        const timelineItems = gsap.utils.toArray('.timeline-item');
        
        if (timelineItems.length > 0) {
            timelineItems.forEach((item, index) => {
                // Timeline marker pulse
                const marker = item.querySelector('.timeline-marker');
                if (marker) {
                    gsap.from(marker, {
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse'
                        },
                        scale: 0,
                        opacity: 0,
                        duration: 0.5,
                        ease: 'back.out(1.7)'
                    });
                }

                // Timeline card
                const card = item.querySelector('.timeline-card');
                if (card) {
                    gsap.from(card, {
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse'
                        },
                        x: 50,
                        opacity: 0,
                        duration: 0.8,
                        delay: 0.2,
                        ease: config.ease
                    });
                }
            });
        }

        // Achievement cards animation
        const achievementCards = gsap.utils.toArray('.achievement-card');
        if (achievementCards.length > 0) {
            achievementCards.forEach(card => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    },
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    ease: config.ease
                });
            });
        }

        // Testimonial cards animation
        const testimonialCards = gsap.utils.toArray('.testimonial-card');
        if (testimonialCards.length > 0) {
            testimonialCards.forEach((card, index) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    },
                    y: 50,
                    opacity: 0,
                    rotation: index % 2 === 0 ? -3 : 3,
                    duration: 0.8,
                    ease: config.ease
                });
            });
        }
    };

    // ================================
    // CONTACT PAGE ANIMATIONS
    // ================================

    const animateContactPage = () => {
        // Contact methods animation
        const contactMethods = gsap.utils.toArray('.contact-method');
        if (contactMethods.length > 0) {
            gsap.from(contactMethods, {
                scrollTrigger: {
                    trigger: '.contact-methods',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                x: -50,
                opacity: 0,
                duration: 0.6,
                stagger: 0.15,
                ease: config.ease
            });
        }

        // Social links animation
        const socialLinks = gsap.utils.toArray('.social-link');
        if (socialLinks.length > 0) {
            gsap.from(socialLinks, {
                scrollTrigger: {
                    trigger: '.social-links',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                x: -50,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: config.ease
            });
        }

        // Contact form animation
        const formGroups = gsap.utils.toArray('.form-group');
        if (formGroups.length > 0) {
            gsap.from(formGroups, {
                scrollTrigger: {
                    trigger: '.contact-form',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                y: 30,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: config.ease
            });
        }

        // FAQ cards animation
        const faqCards = gsap.utils.toArray('.faq-card');
        if (faqCards.length > 0) {
            faqCards.forEach(card => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    },
                    y: 40,
                    opacity: 0,
                    duration: 0.6,
                    ease: config.ease
                });
            });
        }
    };

    // ================================
    // CTA SECTION ANIMATION
    // ================================

    const animateCTASection = () => {
        const ctaSections = gsap.utils.toArray('.cta-section');
        
        ctaSections.forEach(section => {
            gsap.from(section.querySelector('.cta-content'), {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                scale: 0.9,
                opacity: 0,
                duration: 0.8,
                ease: 'back.out(1.4)'
            });
        });
    };

    // ================================
    // FOOTER ANIMATION
    // ================================

    const animateFooter = () => {
        if (document.querySelector('.footer')) {
            const footerColumns = gsap.utils.toArray('.footer-column');
            
            gsap.from('.footer-brand', {
                scrollTrigger: {
                    trigger: '.footer',
                    start: 'top 90%',
                    toggleActions: 'play none none reverse'
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: config.ease
            });

            if (footerColumns.length > 0) {
                gsap.from(footerColumns, {
                    scrollTrigger: {
                        trigger: '.footer',
                        start: 'top 90%',
                        toggleActions: 'play none none reverse'
                    },
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: config.ease
                });
            }
        }
    };

    // ================================
    // PARALLAX EFFECTS
    // ================================

    const initParallaxEffects = () => {
        // Parallax on scroll for specific elements
        gsap.utils.toArray('.parallax').forEach(element => {
            gsap.to(element, {
                yPercent: 50,
                ease: 'none',
                scrollTrigger: {
                    trigger: element,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });
        });
    };

    // ================================
    // HOVER ANIMATIONS
    // ================================

    const initHoverAnimations = () => {
        // Magnetic effect on buttons
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                gsap.to(this, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: 'back.out(1.7)'
                });
            });

            button.addEventListener('mouseleave', function() {
                gsap.to(this, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'back.out(1.7)'
                });
            });
        });
    };

    // ================================
    // INITIALIZE ALL ANIMATIONS
    // ================================

    const initAllAnimations = () => {
        // Page load animations
        initPageLoadAnimations();

        // Common animations
        animateStatsSection();
        animateFeaturedSection();
        animateQuoteSection();
        animateCTASection();
        animateFooter();

        // Page-specific animations
        animateAboutPage();
        animateProjectsPage();
        animateSkillsPage();
        animateExperiencePage();
        animateContactPage();

        // Additional effects
        initParallaxEffects();
        initHoverAnimations();
    };

    // ================================
    // REFRESH SCROLLTRIGGER ON LOAD
    // ================================

    window.addEventListener('load', () => {
        ScrollTrigger.refresh();
    });

    // ================================
    // RUN ANIMATIONS
    // ================================

    initAllAnimations();

    // Make ScrollTrigger available globally for debugging
    window.ScrollTrigger = ScrollTrigger;

})();