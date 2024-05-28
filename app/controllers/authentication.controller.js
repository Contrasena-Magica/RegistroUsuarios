import { db } from '../config/database.js';
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

async function login(req, res) {
    const { user, password } = req.body;
    console.log(req.body)

    if (!user || !password) {
        return res.status(400).send({ status: "Error", message: "Los campos están incompletos" });
    }

    try {
        const sql = 'SELECT * FROM usuarios WHERE email = ?';
        const usuarioAResvisar = await new Promise((resolve, reject) => {
            db.get(sql, [user], (err, row) => {
                if (err) {
                    console.error(err.message);
                    reject(err);
                    return;
                }
                resolve(row);
            });
        });

        if (!usuarioAResvisar) {
            return res.status(400).send({ status: "Error", message: "Error durante login" });
        }

        
        const loginCorrecto = await bcryptjs.compare(password, usuarioAResvisar.password);
        if (!loginCorrecto) {
            return res.status(400).send({ status: "Error", message: "Error durante login" });
        }

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
        
        res.cookie("jwt", token, cookieOption);
        res.redirect('/dashboard');
        
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: "Error", message: "Error interno del servidor" });
    }
}

async function register(req, res) {
    const { user, password, email } = req.body;

    if (!user || !password || !email) {
        return res.status(400).send({ status: "Error", message: "Los campos están incompletos" });
    }

    try {
        console.log("bar")
        const sqlExist = 'SELECT * FROM usuarios WHERE user = ? OR email = ?';
        const exists = await new Promise((resolve, reject) => {
            db.get(sqlExist, [user, email], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });
        console.log("baz", exists)
        if (exists) {
            return res.status(400).send({ status: "Error", message: "Este usuario ya existe" });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);
        const sqlInsert = 'INSERT INTO usuarios (user, email, password) VALUES (?, ?, ?)';
        await new Promise((resolve, reject) => {
            console.log("quux")
            db.run(sqlInsert, [user, email, hashPassword], function(err) {
                console.log("jar", err);
                if (err) reject(err);
                console.log("eay", this.lastID);
                resolve(this.lastID);
            });
        });

        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: "Error", message: "Error interno del servidor" });
    }
}

// Exportamos todos los métodos que necesites en un solo objeto.
export const methods = {
    login,
    register
};