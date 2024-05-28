// app/config/database.js
import sqlite3 from 'sqlite3';
// import fs from 'fs';

sqlite3.verbose();
const db = new sqlite3.Database('./app/databases/Usuarios.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    throw err;
  }
  console.log('Conectado a la base de datos SQLite.');
});

export { db };  // Exportación nombrada
