import express from "express";
import cookieParser from 'cookie-parser';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import { methods as authentication } from "./controllers/authentication.controller.js";
import { methods as authorization } from "./middlewares/authorization.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 4000;

// Configuración de la sesión
app.use(session({
    secret: 'admin', // Reemplaza 'your-secret-key' con una clave secreta real
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Configura como true si estás usando https
  }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
    res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.header('Pragma', 'no-cache');
    res.header('Expires', '0');
    next();
});

app.get("/", authorization.soloPublico, (req, res) => res.sendFile(path.join(__dirname, "/pages/login.html")));
app.get("/admin", authorization.soloAdmin, (req, res) => res.sendFile(path.join(__dirname, "/pages/admin.html")));
app.get("/index", authorization.soloAdmin, (req, res) => res.sendFile(path.join(__dirname, "/pages/index.html")));
app.get("/logout", authorization.soloAdmin, (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                console.error('Error al destruir la sesión:', err);
                return res.status(500).send('Error al cerrar la sesión');
            }
            res.clearCookie('jwt'); // Asegúrate de que el nombre de la cookie aquí es correcto.
            res.redirect('/'); // Redirige a la página de inicio o de inicio de sesión
        });
    } else {
        console.error('Intento de destruir una sesión inexistente');
        res.redirect('/');
    }
});


app.post("/api/login", authentication.login);
app.post("/api/register", authentication.register);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
