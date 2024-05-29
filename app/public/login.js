document.addEventListener('DOMContentLoaded', function() {
  const mensajeError = document.getElementsByClassName("error")[0];
  
  document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const user = e.target.elements.user.value.trim();
    const password = e.target.elements.password.value.trim();

    // Validación básica del lado del cliente
    if (!user || !password) {
      mensajeError.textContent = "Todos los campos son requeridos.";
      mensajeError.classList.remove("escondido");
      return;
    }

    try {
      const response = await fetch("https://localhost:4000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ user, password })
      });

      if (!response.ok) {
        throw new Error('Problemas al iniciar sesión. Por favor, inténtalo de nuevo.');
      }

      const resJson = await response.json();
      if (resJson.redirect) {
        window.location.href = resJson.redirect;
      }
    } catch (error) {
      mensajeError.textContent = error.message;
      mensajeError.classList.remove("escondido");
    }
  });
});
