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
// MAIN JAVASCRIPT FUNCTIONALITY
// ================================

(function() {
    'use strict';

    // ================================
    // GLOBAL VARIABLES
    // ================================
    
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // ================================
    // NAVBAR SCROLL EFFECT
    // ================================
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add shadow on scroll
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll (optional)
        // if (currentScroll > lastScroll && currentScroll > 500) {
        //     navbar.style.transform = 'translateY(-100%)';
        // } else {
        //     navbar.style.transform = 'translateY(0)';
        // }
        
        lastScroll = currentScroll;
    });

    // ================================
    // MOBILE MENU TOGGLE
    // ================================
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ================================
    // ACTIVE NAV LINK
    // ================================
    
    const setActiveNavLink = () => {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
    };
    
    setActiveNavLink();

    // ================================
    // TYPING EFFECT FOR HERO SECTION
    // ================================
    
    const roleText = document.getElementById('roleText');
    
    if (roleText) {
        const roles = [
            'Software Engineer',
            'AI Developer',
            'Aviation Enthusiast',
            'Physics Programmer',
            'Problem Solver',
            'Game Developer',
            'Full-Stack Developer'
        ];
        
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        const typeRole = () => {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                roleText.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                roleText.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }
            
            if (!isDeleting && charIndex === currentRole.length) {
                isDeleting = true;
                typingSpeed = 2000; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typingSpeed = 500; // Pause before next word
            }
            
            setTimeout(typeRole, typingSpeed);
        };
        
        typeRole();
    }

    // ================================
// ANIMATED COUNTERS
// ================================

const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
            element.classList.add('counted');
        }
    };
    
    updateCounter();
};

const observeCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    
    if (counters.length === 0) {
        console.warn('⚠️ No stat counters found');
        return;
    }
    
    console.log(`✅ Found ${counters.length} stat counters`);
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const target = parseInt(entry.target.getAttribute('data-target')) || 0;
                console.log(`Animating counter to: ${target}`);
                animateCounter(entry.target, target);
            }
        });
    }, { 
        threshold: 0.5,
        rootMargin: '0px'
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
};
// Make sure this runs
observeCounters();
    // ================================
    // SKILL BAR ANIMATION
    // ================================
    
    const animateSkillBars = () => {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progress = entry.target.getAttribute('data-progress');
                    entry.target.style.width = progress + '%';
                }
            });
        }, { threshold: 0.5 });
        
        skillBars.forEach(bar => skillObserver.observe(bar));
    };
    
    animateSkillBars();

    // ================================
    // SMOOTH SCROLL
    // ================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ================================
    // SCROLL REVEAL ANIMATION
    // ================================
    
    const revealElements = () => {
        const reveals = document.querySelectorAll('.fade-in-up, .fade-in-down, .fade-in-left, .fade-in-right, .scale-in');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, { threshold: 0.15 });
        
        reveals.forEach(reveal => revealObserver.observe(reveal));
    };
    
    revealElements();

    // ================================
    // PROFILE IMAGE EASTER EGG
    // ================================
    
    const profileImage = document.getElementById('profileImage');
    let clickCount = 0;
    
    if (profileImage) {
        profileImage.addEventListener('click', () => {
            clickCount++;
            
            if (clickCount === 1) {
                profileImage.style.transform = 'rotate(360deg) scale(1.1)';
                setTimeout(() => {
                    profileImage.style.transform = '';
                }, 500);
            }
            
            if (clickCount === 3) {
                // Easter egg: Launch confetti and show message
                createEasterEggEffect();
                clickCount = 0;
            }
            
            // Reset click count after 2 seconds
            setTimeout(() => {
                clickCount = 0;
            }, 2000);
        });
    }
    
    const createEasterEggEffect = () => {
        // Confetti
        const colors = ['#00d4ff', '#0099ff', '#ff0080', '#00ff88', '#ffaa00'];
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
                document.body.appendChild(confetti);
                
                setTimeout(() => confetti.remove(), 4000);
            }, i * 20);
        }
        
        // Show message
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--bg-tertiary);
            padding: 2rem;
            border-radius: var(--radius-lg);
            border: 2px solid var(--primary-color);
            box-shadow: var(--shadow-xl);
            z-index: 10000;
            text-align: center;
            animation: zoomIn 0.5s ease;
        `;
        message.innerHTML = `
            <h2 style="color: var(--primary-color); margin-bottom: 1rem;">🎉 You found an Easter egg! 🎉</h2>
            <p style="color: var(--text-secondary);">Thanks for exploring! ✈️</p>
        `;
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.style.animation = 'fadeOut 0.5s ease';
            setTimeout(() => message.remove(), 500);
        }, 3000);
    };

    // ================================
    // CANVAS BACKGROUND ANIMATION
    // ================================
    
    const heroCanvas = document.getElementById('heroCanvas');
    
    if (heroCanvas) {
        const ctx = heroCanvas.getContext('2d');
        let particles = [];
        
        // Set canvas size
        const resizeCanvas = () => {
            heroCanvas.width = heroCanvas.offsetWidth;
            heroCanvas.height = heroCanvas.offsetHeight;
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // Particle class
        class Particle {
            constructor() {
                this.x = Math.random() * heroCanvas.width;
                this.y = Math.random() * heroCanvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.opacity = Math.random() * 0.5 + 0.2;
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                if (this.x > heroCanvas.width) this.x = 0;
                if (this.x < 0) this.x = heroCanvas.width;
                if (this.y > heroCanvas.height) this.y = 0;
                if (this.y < 0) this.y = heroCanvas.height;
            }
            
            draw() {
                ctx.fillStyle = `rgba(0, 212, 255, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        // Initialize particles
        const initParticles = () => {
            particles = [];
            const particleCount = Math.floor(heroCanvas.width * heroCanvas.height / 10000);
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };
        
        initParticles();
        
        // Connect particles
        const connectParticles = () => {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        ctx.strokeStyle = `rgba(0, 212, 255, ${0.2 * (1 - distance / 100)})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        };
        
        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
            
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            
            connectParticles();
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }

    // ================================
    // CURSOR FOLLOWER (Optional)
    // ================================
    
    // Uncomment to enable custom cursor
    /*
    const cursorDot = document.createElement('div');
    const cursorOutline = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    cursorOutline.className = 'cursor-outline';
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorOutline);
    
    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let outlineX = 0, outlineY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    const animateCursor = () => {
        dotX += (mouseX - dotX) * 0.9;
        dotY += (mouseY - dotY) * 0.9;
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;
        
        cursorDot.style.left = dotX + 'px';
        cursorDot.style.top = dotY + 'px';
        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';
        
        requestAnimationFrame(animateCursor);
    };
    
    animateCursor();
    */

    // ================================
    // KONAMI CODE EASTER EGG
    // ================================
    
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateKonamiCode();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    const activateKonamiCode = () => {
        document.body.style.animation = 'rainbow 2s linear infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
        
        alert('🎮 Konami Code Activated! You are a true gamer! 🎮');
    };

    // ================================
    // UTILITY FUNCTIONS
    // ================================
    
    // Debounce function
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
    
    // Throttle function
    const throttle = (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    };

    // ================================
    // PAGE LOAD ANIMATION
    // ================================
    
    window.addEventListener('load', () => {
        document.body.classList.add('page-enter');
    });

    console.log('%c👋 Hey there! Thanks for checking out my portfolio!', 'color: #00d4ff; font-size: 16px; font-weight: bold;');
    console.log('%c✈️ If you found this, you might enjoy exploring the Easter eggs!', 'color: #ff0080; font-size: 14px;');

})();
// Dev helper: file:// ortamında root-relative linkleri .html'e çevir
(function () {
  if (location.protocol === 'file:') {
    document.querySelectorAll('a[href^="/"]').forEach(a => {
      const path = a.getAttribute('href').replace(/^\//, '') || 'index';
      const htmlHref = path.endsWith('.html') ? path : path + '.html';
      a.setAttribute('href', htmlHref);
    });
    console.log('Dev helper: root links rewritten for file://');
  }
})();