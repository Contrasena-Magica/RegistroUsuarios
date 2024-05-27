// app/db/initDb.js
import { db } from '../config/database.js';

db.run(`CREATE TABLE IF NOT EXISTS usuarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
)`, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  }
  console.log('Tabla de usuarios creada.');
});

db.close((err) => {
  if (err) {
    console.error(err.message);
    throw err;
  }
  console.log('Conexión a la base de datos cerrada.');
});
