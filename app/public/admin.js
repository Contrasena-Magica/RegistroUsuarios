
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("logoutbutton").addEventListener("click", () => {
    document.cookie = 'usuario=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.location.href = "/";
    console.log('listo');
  });
});


