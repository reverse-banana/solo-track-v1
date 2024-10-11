export const ThemeManager = {
    setTheme(themeName) {
        console.log('Setting theme to:', themeName);
        localStorage.setItem('theme', themeName);
        document.documentElement.setAttribute('data-theme', themeName);
    },

    getTheme() {
        const theme = localStorage.getItem('theme') || this.getPreferredColorScheme();
        console.log('Current theme:', theme);
        return theme;
    },

    getPreferredColorScheme() {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    },

    initializeTheme() {
        console.log('Initializing theme');
        this.setTheme(this.getTheme());
    },

    toggleTheme() {
        console.log('Toggling theme');
        const newTheme = this.getTheme() === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }
};