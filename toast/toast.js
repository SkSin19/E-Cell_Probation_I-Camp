// Toast Notification System
class Toast {
    constructor() {
        this.toastContainer = this.getOrCreateContainer();
    }

    getOrCreateContainer() {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.className = 'toast-container';
            document.body.appendChild(container);
        }
        return container;
    }

    show(message, type = 'success', duration = 3000) {
        const toastElement = document.createElement('div');
        toastElement.className = `toast ${type}`;

        const icon = type === 'success' ? '✓' : '✕';
        const iconColor = type === 'success' ? '✓' : '✕';

        toastElement.innerHTML = `
            <span class="toast-icon">${icon}</span>
            <span class="toast-message">${message}</span>
            <button class="toast-close" onclick="this.parentElement.remove()">×</button>
        `;

        this.toastContainer.appendChild(toastElement);

        // Auto remove after duration
        if (duration > 0) {
            setTimeout(() => {
                toastElement.classList.add('removing');
                setTimeout(() => {
                    toastElement.remove();
                }, 300);
            }, duration);
        }

        return toastElement;
    }

    success(message, duration = 3000) {
        return this.show(message, 'success', duration);
    }

    error(message, duration = 3000) {
        return this.show(message, 'error', duration);
    }
}

// Initialize Toast
const toast = new Toast();
