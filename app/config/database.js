// app/config/database.js
import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('./databases/User.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  }
  console.log('Conectado a la base de datos SQLite.');
});

export { db };  // Exportación nombrada
