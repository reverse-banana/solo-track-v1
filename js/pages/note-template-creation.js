alert('note-template-creation.js is running');
console.log('note-template-creation.js is running');

// Import DataManager from dbmanager.js
import { DataManager } from '../services/dbmanager.js';




// Add event listener for when DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM content loaded');

    // Get references to DOM elements
    const propertiesContainer = document.getElementById('properties-container');
    const addPropertyButton = document.getElementById('add-property');
    const propertyNameInput = document.getElementById('property-name');
    const propertyTypeSelect = document.getElementById('property-type');
    const saveTemplateButton = document.getElementById('save-template');
    console.log('Save template button:', saveTemplateButton);
    const savedTemplatesSelect = document.getElementById('saved-templates');
    const templateList = document.getElementById('template-list');
    const themeToggle = document.getElementById('theme-toggle');
    const propertiesPreview = document.getElementById('properties-preview');
    const templateNameInput = document.getElementById('template-name');

    // Add event listeners to buttons and select elements
    addPropertyButton.addEventListener('click', addProperty);
    saveTemplateButton.addEventListener('click', saveTemplate);
    if (saveTemplateButton) {
        console.log('Adding click event listener to save template button');
        saveTemplateButton.addEventListener('click', (event) => {
            event.preventDefault();
            console.log('Save template button clicked');
            saveTemplateButton.style.backgroundColor = 'red'; // Visual feedback
            saveTemplate();
        });
    } else {
        console.error('Save template button not found');
    }
    savedTemplatesSelect.addEventListener('change', (e) => loadTemplate(e.target.value));
    themeToggle.addEventListener('click', toggleTheme);

    // Load existing templates
    loadTemplateList();

    // Function to add a new property to the template
    function addProperty() {
        const propertyName = propertyNameInput.value.trim();
        const propertyType = propertyTypeSelect.value;

        if (propertyName) {
            // Create unique ID for the property
            const propertyId = propertyName.toLowerCase().replace(/\s+/g, '-');
            // Create form group for the new property
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

            // Clear input field and setup delete button
            propertyNameInput.value = '';
            setupDeleteButton(formGroup.querySelector('.delete-property'), previewItem);
        }
    }

    // Function to generate HTML for different input types
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

    // Function to setup delete button for properties
    function setupDeleteButton(button, previewItem) {
        button.addEventListener('click', function() {
            this.closest('.form-group').remove();
            previewItem.remove();
        });
    }

    // Function to save the template
    async function saveTemplate() {
        console.log('Save template function called');
        const templateName = templateNameInput.value.trim();
        if (!templateName) {
            showPopup('Please enter a template name', 'error');
            return;
        }

        // Collect properties from the form
        const properties = Array.from(propertiesContainer.children).map(formGroup => {
            const label = formGroup.querySelector('label');
            const input = formGroup.querySelector('input, select');
            return {
                name: label.textContent,
                type: input.type === 'select-one' ? 'select' : input.type
            };
        });

        if (properties.length === 0) {
            showPopup('Please add at least one property', 'error');
            return;
        }

        const newTemplate = {
            name: templateName,
            properties: properties
        };

        try {
            // Save template to database
            await DataManager.saveItem('templates', newTemplate);
            showPopup('Template saved successfully!', 'success');
            // Clear form and reload template list
            templateNameInput.value = '';
            propertiesContainer.innerHTML = '';
            await loadTemplateList();
        } catch (error) {
            console.error('Error saving template:', error);
            showPopup('Failed to save template. Please try again.', 'error');
        }

        // Additional check for properties (seems redundant, consider removing)
        const propertyElements = Array.from(propertiesContainer.children);
        if (propertyElements.length < 1) {
            showPopup('Please add at least one property', false);
            return;
        }

        // Create template object (seems redundant, consider removing)
        const template = {
            name: templateName,
            properties: properties.map(formGroup => {
                const label = formGroup.querySelector('label');
                const input = formGroup.querySelector('input, select');
                return {
                    name: label.textContent,
                    type: input.type === 'select-one' ? 'select' : input.type
                };
            })
        };

        console.log('Template to be saved:', template);

        try {
            // Save template to database (redundant, consider removing)
            showPopup('Saving template...', 'info');
            await DataManager.saveItem('templates', template);
            console.log('Template saved successfully');
            showPopup('Template saved successfully!', 'success');
            await loadTemplateList();
            // Clear form and preview
            templateNameInput.value = '';
            propertiesContainer.innerHTML = '';
            propertiesPreview.innerHTML = '';
        } catch (error) {
            console.error('Error saving template:', error);
            showPopup('Failed to save template. Please try again.', 'error');
        }
    }

    // Function to show popup messages
    function showPopup(message, type) {
        console.log('Showing popup:', message, type);
        const popup = document.createElement('div');
        popup.className = `popup ${type}`;
        popup.textContent = message;
        document.body.appendChild(popup);
        setTimeout(() => {
            popup.remove();
        }, 3000);
    }

    // Function to load and display the list of saved templates
    async function loadTemplateList() {
        console.log('Loading template list');
        savedTemplatesSelect.innerHTML = '<option value="">Select a saved template</option>';
        templateList.innerHTML = '';

        try {
            // Fetch all templates from database
            const templates = await DataManager.getAllItems('templates');
            console.log('Loaded templates:', templates);
            templates.forEach(template => {
                // Add template to dropdown and list
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
            showPopup('Failed to load templates. Please try again.', 'error');
        }
    }

    // Function to load a specific template
    async function loadTemplate(templateId) {
        try {
            // Fetch template from database
            const template = await DataManager.getItem('templates', parseInt(templateId));
            if (template) {
                // Clear existing properties
                propertiesContainer.innerHTML = '';
                propertiesPreview.innerHTML = '';
                // Add each property from the template
                template.properties.forEach(prop => {
                    const formGroup = document.createElement('div');
                    formGroup.className = 'form-group';
                    formGroup.innerHTML = `
                        <label for="${prop.name}">${prop.name}</label>
                        ${getInputHtml(prop.type, prop.name)}
                        <button type="button" class="delete-property"><i class="fas fa-trash"></i> Delete</button>
                    `;
                    propertiesContainer.appendChild(formGroup);

                    // Add to preview
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

    // Function to toggle between light and dark themes
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

    // Check for saved theme preference and apply if exists
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
    }
})

// Add this at the end of the file
console.log('note-template-creation.js loaded');
