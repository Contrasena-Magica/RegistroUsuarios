document.addEventListener('DOMContentLoaded', function() {
  const logoutButton = document.getElementById('logoutButton');

  if (logoutButton) {
      logoutButton.addEventListener('click', function() {
          document.cookie = 'jwt=; Path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
          window.location.href = "/";
      });
  } else {
      console.error("Logout button not found!");
  }
});
