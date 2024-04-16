# Registro de Usuarios

El proyecto consiste en una página web de inicio de sesión de usuarios que permite a los usuarios autenticarse de forma segura, crear cuentas, gestionar contraseñas y acceder a su cuenta de usuario. A continuación, se describen las características clave del proyecto y las historias de usuario:

## Características Principales
- Autenticación segura: Los usuarios pueden iniciar sesión utilizando sus credenciales de acceso de manera segura y protegida.
- Registro de nuevos usuarios: Permite a los usuarios crear nuevas cuentas proporcionando información básica.
- Gestión de contraseñas: Los usuarios pueden restablecer sus contraseñas mediante un proceso de confirmación por correo electrónico.
- Experiencia de usuario intuitiva: La interfaz de usuario está diseñada para ser fácil de usar y accesible.
- Protección de datos: El proyecto cumple con los estándares de seguridad y privacidad de datos para proteger la información del usuario.
  
## Historias de Usuario
### Registro de Usuario
- Configurar un entorno de desarrollo con Node.js para el backend y React con Tailwind CSS para el frontend.
- Crear un esquema de base de datos MySQL para almacenar la información del usuario (nombre, correo electrónico, contraseña, etc.).
- Implementar el backend en Node.js para manejar las solicitudes de registro de usuarios.
- Crear un formulario de registro en React con validación de datos en el cliente utilizando librerías como Formik y Yup.
- Implementar la lógica para procesar la solicitud de registro en el backend, validar datos y almacenar al usuario en la base de datos.
- Desarrollar la funcionalidad de envío de correo electrónico de confirmación para nuevos usuarios.
- Probar la aplicación en contenedores Docker para garantizar que funcione correctamente en un entorno aislado y replicable.

### Inicio de Sesión
- Crear la interfaz de usuario de la página de inicio de sesión en React utilizando Tailwind CSS.
- Configurar las rutas y controladores en el backend para manejar solicitudes de inicio de sesión.
- Implementar la lógica de autenticación en el backend utilizando bcrypt para verificar contraseñas.
- Establecer la sesión del usuario en el backend después de una autenticación exitosa y devolver un token de acceso JWT al cliente.
- Desarrollar la lógica de cierre de sesión para destruir la sesión del usuario y eliminar el token de acceso.

### Gestión de Contraseñas
- Crear una página en el frontend para que los usuarios soliciten un restablecimiento de contraseña.
- Implementar la lógica en el backend para generar un token de restablecimiento de contraseña único y enviarlo por correo electrónico al usuario.
- Crear una ruta en el backend para manejar la solicitud de restablecimiento de contraseña y verificar la validez del token.
- Desarrollar la interfaz de usuario para que los usuarios ingresen una nueva contraseña después de recibir el correo electrónico de restablecimiento.
- Actualizar la contraseña del usuario en la base de datos después de la confirmación del restablecimiento.

### Criterios de Aceptación
- Todas las funcionalidades de autenticación, registro y gestión de contraseñas deben ser fluidas, sin errores y seguras.
- El sistema debe adherirse a las mejores prácticas para la autenticación y manejo de contraseñas, incluidos cifrado y protección contra amenazas de seguridad comunes.
- Los mensajes y notificaciones al usuario deben ser claros y útiles en todo el proceso.
