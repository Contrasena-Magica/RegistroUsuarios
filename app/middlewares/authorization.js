import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import { userDB } from '../config/database.js';

dotenv.config();

const JWT_COOKIE_NAME = 'jwt';

async function getDecodedTokenFromCookie(req) {
  const cookies = req.headers.cookie;
  if (!cookies) return null;
  const cookieJWT = cookies.split("; ").find(cookie => cookie.startsWith(`${JWT_COOKIE_NAME}=`));
  if (!cookieJWT) return null;
  const token = cookieJWT.slice(JWT_COOKIE_NAME.length + 1);
  return new Promise(resolve => {
    jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error("JWT verification error:", err.message);
        resolve(null);
      } else {
        resolve(decoded);
      }
    });
  });
}

async function validateUser(decodedToken) {
  if (!decodedToken || !decodedToken.user) return false;
  const sql = 'SELECT * FROM usuarios WHERE user = ?';
  return new Promise(resolve => {
    userDB.get(sql, [decodedToken.user], (err, row) => {
      if (err) {
        console.error("Database error:", err.message);
        resolve(false);
      } else {
        resolve(Boolean(row));
      }
    });
  });
}

async function revisarCookie(req) {
  try {
    const decodedToken = await getDecodedTokenFromCookie(req);
    const isValidUser = await validateUser(decodedToken);
    if (!isValidUser) {
      console.log("Usuario no válido o no encontrado en la base de datos.");
    }
    return isValidUser;
  } catch (err) {
    console.error("Error handling cookies:", err.message);
    return false;
  }
}

async function soloAdmin(req, res, next) {
  try {
    const logueado = await revisarCookie(req);
    if (logueado) {
      return next();
    }
    res.status(401).send("Acceso no autorizado: por favor, inicia sesión con una cuenta de administrador.");
  } catch (err) {
    res.status(500).send("Error interno del servidor");
  }
}


async function soloPublico(req, res, next) {
  const logueado = await revisarCookie(req);
  if (!logueado) {
    return next();
  }
  res.redirect("/index");
}

export const methods = {
  soloAdmin,
  soloPublico,
};
