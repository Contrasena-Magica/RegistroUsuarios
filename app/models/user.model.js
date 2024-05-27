// app/models/user.model.js
const db = require('../config/database');

class User {
  static findByUsername(username) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM usuarios WHERE username = ?';
      db.get(sql, [username], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  static create(username, email, hashedPassword) {
    return new Promise((resolve, reject) => {
      if (!username || !email || !hashedPassword) {
        return reject(new Error("Todos los campos son obligatorios"));
      }
      if (username.length < 3) {
        return reject(new Error("El nombre de usuario debe tener al menos 3 caracteres"));
      }
      if (!email.includes('@')) {
        return reject(new Error("Email no válido"));
      }
      // Continúa con la inserción después de pasar las validaciones
      const sql = 'INSERT INTO usuarios (username, email, password) VALUES (?, ?, ?)';
      db.run(sql, [username, email, hashedPassword], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      });
    });
  }
  
}

module.exports = User;
