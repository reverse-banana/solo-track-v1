export function loadThemeToggle() {
    fetch('/components/theme-toggle.html')
        .then(response => response.text())
        .then(html => {
            document.body.insertAdjacentHTML('afterbegin', html);
            initializeThemeToggle();
        })
        .catch(error => console.error('Error loading theme toggle:', error));
}