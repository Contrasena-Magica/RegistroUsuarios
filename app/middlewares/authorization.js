import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import {usuarios} from "./../controllers/authentication.controller.js";
import db from '../config/database.js';


dotenv.config();

async function revisarCookie(req) {
  return new Promise((resolve, reject) => {
    try {
      const cookies = req.headers.cookie;
      if (!cookies) return resolve(false);
      const cookieJWT = cookies.split("; ").find(cookie => cookie.startsWith("jwt="));
      if (!cookieJWT) return resolve(false);
      const token = cookieJWT.slice(4);
      const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
      
      const sql = 'SELECT * FROM usuarios WHERE username = ?';
      db.get(sql, [decoded.user], (err, row) => {
        if (err) {
          console.error(err.message);
          return resolve(false);
        }
        if (!row) {
          console.log("Usuario no encontrado en la base de datos.");
          return resolve(false);
        }
        console.log("Usuario verificado correctamente.");
        return resolve(true);
      });
    } catch (err) {
      console.error("Error al verificar el token: ", err);
      return resolve(false);
    }
  });
}

async function soloAdmin(req, res, next) {
  const logueado = await revisarCookie(req);
  if (logueado) return next();
  return res.redirect("/");
}

async function soloPublico(req, res, next) {
  const logueado = await revisarCookie(req);
  if (!logueado) return next();
  return res.redirect("/admin");
}

export const methods = {
  soloAdmin,
  soloPublico,
}