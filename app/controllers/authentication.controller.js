import { userDB } from '../config/database.js';
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

async function login(req, res) {
    const { user, password } = req.body;

    // Validar que los campos no estén vacíos
    if (!user || !password) {
        return res.status(400).send({ status: "Error", message: "Los campos están incompletos" });
    }

    try {
        const sql = 'SELECT * FROM usuarios WHERE email = ?';
        const usuarioAResvisar = await new Promise((resolve, reject) => {
            userDB.get(sql, [user], (err, row) => {
                if (err) {
                    console.error(err.message);
                    reject(err);
                    return;
                }
                resolve(row);
            });
        });

        // Validar si el usuario existe
        if (!usuarioAResvisar) {
            return res.status(400).json({ success: false, message: "Usuario o contraseña incorrectos" });
        }

        // Comparar la contraseña ingresada con la almacenada
        const loginCorrecto = await bcryptjs.compare(password, usuarioAResvisar.password);
        if (!loginCorrecto) {
            return res.status(400).json({ success: false, message: "Usuario o contraseña incorrectos" });
        }

        // Generar token JWT
        const token = jsonwebtoken.sign(
            { user: usuarioAResvisar.user },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION }
        );

        const cookieOption = {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
            httpOnly: true,
            path: "/"
        };

        // Enviar la cookie con el token
        res.cookie("jwt", token, cookieOption);
        res.redirect('/index');

    } catch (err) {
        console.error(err);
        res.status(500).send({ status: "Error", message: "Error interno del servidor" });
    }
}

async function register(req, res) {
    const { user, password, email } = req.body;

    // Validar que los campos no estén vacíos
    if (!user || !password || !email) {
        return res.status(400).send({ status: "Error", message: "Los campos están incompletos" });
    }

    try {
        const sqlExist = 'SELECT * FROM usuarios WHERE user = ? OR email = ?';
        const exists = await new Promise((resolve, reject) => {
            userDB.get(sqlExist, [user, email], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });

        // Verificar si el usuario o correo ya existe
        if (exists) {
            return res.status(400).send({ status: "Error", message: "Este usuario ya existe" });
        }

        // Generar el hash de la contraseña
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);
        const sqlInsert = 'INSERT INTO usuarios (user, email, password) VALUES (?, ?, ?)';

        await new Promise((resolve, reject) => {
            userDB.run(sqlInsert, [user, email, hashPassword], function(err) {
                if (err) reject(err);
                resolve(this.lastID);
            });
        });

        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: "Error", message: "Error interno del servidor" });
    }
}

export const methods = {
    login,
    register
};
