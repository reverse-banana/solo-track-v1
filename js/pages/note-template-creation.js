import { DataManager } from '../services/dbmanager.js';

document.addEventListener('DOMContentLoaded', () => {
    const propertiesContainer = document.getElementById('properties-container');
    const addPropertyButton = document.getElementById('add-property');
    const propertyNameInput = document.getElementById('property-name');
    const propertyTypeSelect = document.getElementById('property-type');
    const saveTemplateButton = document.getElementById('save-template');
    const savedTemplatesSelect = document.getElementById('saved-templates');
    const templateList = document.getElementById('template-list');
    const themeToggle = document.getElementById('theme-toggle');
    const propertiesPreview = document.getElementById('properties-preview');
    const templateNameInput = document.getElementById('template-name');

    addPropertyButton.addEventListener('click', addProperty);
    saveTemplateButton.addEventListener('click', saveTemplate);
    savedTemplatesSelect.addEventListener('change', (e) => loadTemplate(e.target.value));
    themeToggle.addEventListener('click', toggleTheme);

    function addProperty() {
        const propertyName = propertyNameInput.value.trim();
        const propertyType = propertyTypeSelect.value;

        if (propertyName) {
            const propertyId = propertyName.toLowerCase().replace(/\s+/g, '-');
            const formGroup = document.createElement('div');
            formGroup.className = 'form-group';
            formGroup.innerHTML = `
                <label for="${propertyId}">${propertyName}</label>
                ${getInputHtml(propertyType, propertyId)}
                <button type="button" class="delete-property"><i class="fas fa-trash"></i> Delete</button>
            `;
            propertiesContainer.appendChild(formGroup);

            // Add property to preview section
            const previewItem = document.createElement('div');
            previewItem.className = 'preview-item';
            previewItem.innerHTML = `
                <strong>${propertyName}</strong>: ${propertyType}
            `;
            propertiesPreview.appendChild(previewItem);

            propertyNameInput.value = '';
            setupDeleteButton(formGroup.querySelector('.delete-property'), previewItem);
        }
    }

    function getInputHtml(type, id) {
        switch (type) {
            case 'text':
                return `<input type="text" id="${id}" name="${id}">`;
            case 'number':
                return `<input type="number" id="${id}" name="${id}">`;
            case 'checkbox':
                return `<input type="checkbox" id="${id}" name="${id}">`;
            case 'range':
                return `<input type="range" id="${id}" name="${id}" min="0" max="10" step="1"><output for="${id}"></output>`;
            case 'time':
                return `<input type="time" id="${id}" name="${id}">`;
            default:
                return `<input type="text" id="${id}" name="${id}">`;
        }
    }

    function setupDeleteButton(button, previewItem) {
        button.addEventListener('click', function() {
            this.closest('.form-group').remove();
            previewItem.remove();
        });
    }

    async function saveTemplate() {
        const templateName = templateNameInput.value.trim();
        if (!templateName) {
            showPopup('Please enter a template name', false);
            return;
        }

        const properties = Array.from(propertiesContainer.children);
        if (properties.length < 1) {
            showPopup('Please add at least one property', false);
            return;
        }

        const template = {
            name: templateName,
            properties: properties.map(formGroup => {
                const label = formGroup.querySelector('label');
                const input = formGroup.querySelector('input, select');
                return {
                    name: label.textContent,
                    type: input.type === 'range' ? 'range' : input.type
                };
            })
        };

        try {
            await DataManager.saveItem('templates', template);
            showPopup('Template saved successfully!', true);
            await loadTemplateList();
            templateNameInput.value = '';
        } catch (error) {
            console.error('Error saving template:', error);
            showPopup('Sorry, the template hasn\'t been saved. Please try again.', false);
        }
    }

    function showPopup(message, isSuccess) {
        const popup = document.createElement('div');
        popup.className = `popup ${isSuccess ? 'success' : 'error'}`;
        popup.textContent = message;
        document.body.appendChild(popup);
        setTimeout(() => {
            popup.remove();
        }, 3000);
    }

    async function loadTemplateList() {
        savedTemplatesSelect.innerHTML = '<option value="">Select a saved template</option>';
        templateList.innerHTML = '';

        try {
            const templates = await DataManager.getAllItems('templates');
            templates.forEach(template => {
                const option = document.createElement('option');
                option.value = template.id;
                option.textContent = template.name;
                savedTemplatesSelect.appendChild(option);

                const templateItem = document.createElement('div');
                templateItem.textContent = template.name;
                templateList.appendChild(templateItem);
            });
        } catch (error) {
            console.error('Error loading template list:', error);
            showPopup('Failed to load templates. Please try again.', false);
        }
    }

    async function loadTemplate(templateId) {
        try {
            const template = await DataManager.getItem('templates', parseInt(templateId));
            if (template) {
                propertiesContainer.innerHTML = '';
                propertiesPreview.innerHTML = '';
                template.properties.forEach(prop => {
                    const formGroup = document.createElement('div');
                    formGroup.className = 'form-group';
                    formGroup.innerHTML = `
                        <label for="${prop.name}">${prop.name}</label>
                        ${getInputHtml(prop.type, prop.name)}
                        <button type="button" class="delete-property"><i class="fas fa-trash"></i> Delete</button>
                    `;
                    propertiesContainer.appendChild(formGroup);

                    const previewItem = document.createElement('div');
                    previewItem.className = 'preview-item';
                    previewItem.innerHTML = `
                        <strong>${prop.name}</strong>: ${prop.type}
                    `;
                    propertiesPreview.appendChild(previewItem);

                    setupDeleteButton(formGroup.querySelector('.delete-property'), previewItem);
                });
            }
        } catch (error) {
            console.error('Error loading template:', error);
        }
    }

    function toggleTheme() {
        document.body.classList.toggle('dark-theme');
        localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
    }

    // Setup range input output
    propertiesContainer.addEventListener('input', function(event) {
        if (event.target.type === 'range') {
            const output = event.target.nextElementSibling;
            output.textContent = event.target.value;
        }
    });

    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
    }

    // Initial load of template list
    loadTemplateList();
});
