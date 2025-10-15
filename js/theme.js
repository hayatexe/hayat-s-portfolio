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
// THEME TOGGLE FUNCTIONALITY
// ================================

(function() {
    'use strict';

    // Get theme toggle button
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    const body = document.body;

    // Get stored theme or default to dark
    const getStoredTheme = () => localStorage.getItem('theme') || 'dark';
    const setStoredTheme = (theme) => localStorage.setItem('theme', theme);

    // Get current theme
    const getCurrentTheme = () => html.getAttribute('data-theme') || 'dark';

    // Set theme
    const setTheme = (theme) => {
        html.setAttribute('data-theme', theme);
        updateThemeIcon(theme);
        setStoredTheme(theme);
    };

    // Update theme icon
    const updateThemeIcon = (theme) => {
        const icon = themeToggle.querySelector('i');
        if (theme === 'light') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    };

    // Toggle theme
    const toggleTheme = () => {
        // Add transitioning class to prevent animation flicker
        body.classList.add('theme-transitioning');

        const currentTheme = getCurrentTheme();
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        setTheme(newTheme);

        // Remove transitioning class after animation
        setTimeout(() => {
            body.classList.remove('theme-transitioning');
        }, 100);

        // Easter egg: Confetti on theme change (sometimes)
        if (Math.random() > 0.9) {
            createConfetti();
        }
    };

    // Initialize theme on page load
    const initTheme = () => {
        const storedTheme = getStoredTheme();
        setTheme(storedTheme);
    };

    // Create confetti effect (Easter egg)
    const createConfetti = () => {
        const colors = ['#00d4ff', '#0099ff', '#ff0080', '#00ff88', '#ffaa00'];
        const confettiCount = 50;

        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.animationDelay = Math.random() * 0.5 + 's';
                confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
                document.body.appendChild(confetti);

                // Remove confetti after animation
                setTimeout(() => {
                    confetti.remove();
                }, 3000);
            }, i * 30);
        }
    };

    // Event listener for theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Keyboard shortcut: Ctrl/Cmd + K to toggle theme
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            toggleTheme();
        }
    });

    // Listen for system theme preference changes
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    darkModeMediaQuery.addEventListener('change', (e) => {
        // Only auto-switch if user hasn't manually set a preference
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });

    // Initialize theme on load
    initTheme();

    // Make functions available globally if needed
    window.themeManager = {
        toggle: toggleTheme,
        set: setTheme,
        get: getCurrentTheme
    };

})();