// Form Handling and Validation

class FormHandler {
    constructor(formSelector) {
        this.form = document.querySelector(formSelector);
        if (this.form) {
            this.setupFormListeners();
        }
    }

    setupFormListeners() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    validateForm() {
        const inputs = this.form.querySelectorAll('input, textarea, select');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;

        // Remove previous error
        this.removeError(field);

        // Required fields
        if (field.hasAttribute('required') && !value) {
            this.showError(field, 'This field is required');
            isValid = false;
        }
        // Email validation
        else if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                this.showError(field, 'Please enter a valid email address');
                isValid = false;
            }
        }
        // Phone validation
        else if (field.type === 'tel' && value) {
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(value) || value.replace(/\D/g, '').length < 10) {
                this.showError(field, 'Please enter a valid phone number');
                isValid = false;
            }
        }
        // Min length
        else if (field.hasAttribute('minlength')) {
            const minLength = parseInt(field.getAttribute('minlength'));
            if (value.length < minLength) {
                this.showError(field, `Minimum ${minLength} characters required`);
                isValid = false;
            }
        }

        return isValid;
    }

    showError(field, message) {
        field.classList.add('error');
        field.style.borderColor = '#e63946';

        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.cssText = 'color: #e63946; font-size: 0.9rem; margin-top: 0.25rem;';

        field.parentNode.appendChild(errorDiv);
    }

    removeError(field) {
        field.classList.remove('error');
        field.style.borderColor = '';

        const errorDiv = field.parentNode.querySelector('.error-message');
        if (errorDiv) errorDiv.remove();
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.validateForm()) {
            this.submitForm();
        }
    }

    submitForm() {
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);

        // For demo purposes, just log the data
        console.log('Form submitted:', data);

        // In production, send to backend
        // fetch('/api/submit-form', {
        //     method: 'POST',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify(data)
        // })
        // .then(response => response.json())
        // .then(result => {
        //     if (result.success) {
        //         showNotification('Form submitted successfully!', 'success');
        //         this.form.reset();
        //     } else {
        //         showNotification('Error submitting form', 'error');
        //     }
        // })
        // .catch(error => showNotification('Error: ' + error.message, 'error'));

        // Demo success message
        showNotification('Form submitted successfully! We will review your application.', 'success');
        this.form.reset();
    }
}

// Initialize forms when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all forms on the page
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        new FormHandler(form);
    });
});
