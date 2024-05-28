import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import { db } from '../config/database.js';

dotenv.config();

async function revisarCookie(req) {
  return new Promise((resolve) => {
    try {
      const cookies = req.headers.cookie;
      if (!cookies) return resolve(false);
      const cookieJWT = cookies.split("; ").find(cookie => cookie.startsWith("jwt="));
      if (!cookieJWT) return resolve(false);
      const token = cookieJWT.slice(4);
      jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          console.error("JWT verification error:", err.message);
          return resolve(false);
        }
        const sql = 'SELECT * FROM usuarios WHERE user = ?';
        db.get(sql, [decoded.user], (err, row) => {
          if (err) {
            console.error("Database error:", err.message);
            return resolve(false);
          }
          if (!row) {
            console.log("Usuario no encontrado en la base de datos.");
            return resolve(false);
          }
          console.log("Usuario verificado correctamente.");
          return resolve(true);
        });
      });
    } catch (err) {
      console.error("Error handling cookies:", err.message);
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
};
