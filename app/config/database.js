// app/config/database.js
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./db/RegistroUsuarios.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  }
  console.log('Conectado a la base de datos SQLite.');
});

module.exports = db;
