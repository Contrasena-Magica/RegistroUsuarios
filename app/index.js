// Importar módulos
import express from "express";
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { methods as authentication } from "./controllers/authentication.controller.js";
import { methods as authorization } from "./middlewares/authorization.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

//Server
const app = express();
const PORT = process.env.PORT || 4000;

//Configuración
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Middleware para evitar cache
app.use((req, res, next) => {
    res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.header('Pragma', 'no-cache');
    res.header('Expires', '0');
    next();
});

//Rutas
app.get("/", authorization.soloPublico, (req, res) => res.sendFile(path.join(__dirname, "/pages/login.html")));
app.get("/admin", authorization.soloAdmin, (req, res) => res.sendFile(path.join(__dirname, "/pages/admin.html")));
app.get("/dashboard", authorization.soloAdmin, (req, res) => res.sendFile(path.join(__dirname, "/pages/dashboard.html")));
app.get("/index", authorization.soloAdmin, (req, res) => res.sendFile(path.join(__dirname, "/pages/index.html")));
app.post("/api/login", authentication.login);
app.post("/api/register", authentication.register);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
