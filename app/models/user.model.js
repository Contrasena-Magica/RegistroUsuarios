// app/models/user.model.js
import { userDB } from '../config/database.js';
import validator from 'validator';  // Asumiendo que agregas esta librería para validación

class User {
  static findByUsername(username) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM usuarios WHERE username = ?';
      userDB.get(sql, [username], (err, row) => {
        if (err) {
          reject(new Error(`Error al buscar el usuario: ${err.message}`));
        } else {
          resolve(row);
        }
      });
    });
  }

  static create(username, email, hashedPassword) {
    return new Promise((resolve, reject) => {
      // Validaciones más robustas
      if (!username || !email || !hashedPassword) {
        reject(new Error("Todos los campos son obligatorios"));
        return;
      }
      if (!validator.isLength(username, { min: 3 })) {
        reject(new Error("El nombre de usuario debe tener al menos 3 caracteres"));
        return;
      }
      if (!validator.isEmail(email)) {
        reject(new Error("Email no válido"));
        return;
      }

      const sql = 'INSERT INTO usuarios (username, email, password) VALUES (?, ?, ?)';
      userDB.run(sql, [username, email, hashedPassword], function(err) {
        if (err) {
          reject(new Error(`Error al crear el usuario: ${err.message}`));
        } else {
          resolve({ id: this.lastID });
        }
      });
    });
  }
}

export default User;
