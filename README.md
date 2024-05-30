# Formulario de inicio de sesion + dashboard

Este repositorio contiene el codigo fuente del proyecto de la materia de Ing. de software. El proyecto consiste en una pagina web de inicio de sesion de usuarios
que permite a estos mismos auntenticarse de forma segura, crear cuentas, gestionar contraseñas y acceder a su cuenta de usuario para visualizar un dashboard. Sigue las instrucciones a continuacion para configurar el entorno de desarrollo.

## Dashboard

El dashboard muestra los casos de COVID-19 registrados por continente.

![Dasboard](/app/public/images/dashboard.png)

## Estructura del Proyecto

El repositorio está organizado de la siguiente manera:

- **/app/:** Contiene los principales componentes lógicos y de datos del backend.

    - **config/:** Configuraciones globales del proyecto, incluyendo la configuración de bases de datos.
    - **controllers/:** Controladores que manejan la lógica de negocio para las diversas rutas.
    - **databases/:** Almacena los archivos de bases de datos como SQLite que contienen los datos de la aplicación.
    - **middlewares/:** Funciones de middleware que procesan las solicitudes antes de llegar a las rutas finales.
    - **models/:** Modelos que definen la estructura de las bases de datos y la lógica para interactuar con ellas.
    - **pages/:** Contiene las páginas HTML estáticas que se sirven al cliente
    - **public/:** Archivos estáticos (CSS, JavaScript, imágenes) accesibles directamente por los clientes.
    - **server/:** Punto de entrada principal del servidor que configura el middleware y las rutas.

- **services/:** Contiene servicios auxiliares, como puede ser la lógica de negocios reutilizable o integraciones con APIs externas.
  
- **views/:** Contiene las plantillas de vista (por ejemplo, archivos .ejs) utilizadas para generar HTML dinámico.

- **node_modules/:** Carpeta generada por Node.js que contiene todas las bibliotecas y dependencias del proyecto

- **package.json:** Archivo de configuración de Node.js con información del proyecto y dependencias.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- **Node.js**: Descargar e instalar [Node.js (v20.12.1)](https://nodejs.org/)
- **NPM** (Administrador de paquetes de Node.js): Normalmente se instala automáticamente con Node.js.
- Instala **SQlite** en tu sistema. Puedes descargar e instalar MySQL desde [mysql.com](https://www.sqlite.org/)

## Instalacion

1. Clona este repositorio en tu máquina local utilizando Git:    

    ```
    git clone https://github.com/Contrasena-Magica/bnmx-app.git
    ```

2. Instala las dependencias necesarias:

    ```
    node install express coockie-parser session sqlite3 bcryptjs jsonwebtoken dotenv validator
    ```

3. Utiliza Docker para ejecutar la aplicación. Puedes hacerlo utilizando el archivo **docker-compose.yml** proporcionado en este repositorio. Este archivo incluye la configuración necesaria para ejecutar la aplicación con Docker de forma rápida y sencilla.

4. Ejecuta la aplicacion
    ```
    node app.js
    ```

La aplicación se ejecutará en http://localhost:4000. Abre tu navegador web y visita esta dirección para ver la aplicación en funcionamiento.


