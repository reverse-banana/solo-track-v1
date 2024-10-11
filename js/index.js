import { ThemeManager } from './lib/theme-manager.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM content loaded');
    ThemeManager.initializeTheme();
    
    const toggleButton = document.getElementById('theme-toggle');
    if (toggleButton) {
        console.log('Theme toggle button found');
        toggleButton.addEventListener('click', () => {
            console.log('Theme toggle button clicked');
            ThemeManager.toggleTheme();
        });
    } else {
        console.error('Theme toggle button not found');
    }
});