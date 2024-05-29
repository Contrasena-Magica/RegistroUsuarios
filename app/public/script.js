document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');

    if (!container) {
        console.error('Container element is missing.');
        return;
    }

    if (!registerBtn) {
        console.error('Register button is missing.');
        return;
    }

    if (!loginBtn) {
        console.error('Login button is missing.');
        return;
    }

    // Listener para activar el contenedor.
    registerBtn.addEventListener('click', () => {
        container.classList.add("active");
    });

    // Listener para desactivar el contenedor.
    loginBtn.addEventListener('click', () => {
        container.classList.remove("active");
    });
});
