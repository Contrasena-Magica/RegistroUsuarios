// app/config/database.js
import sqlite3 from 'sqlite3';
sqlite3.verbose();

// Función para conectar a una base de datos SQLite
function connectToDatabase(dbPath) {
  return new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
      console.error(`Error al conectar con la base de datos en ${dbPath}:`, err.message);
      throw err; // Detener la ejecución si no se puede establecer la conexión
    }
    console.log(`Conectado a la base de datos SQLite en ${dbPath}.`);
  });
}

// Crear conexiones a las bases de datos
const userDB = connectToDatabase('./app/databases/Usuarios.db');
const covidDB = connectToDatabase('./app/databases/Covid.db');

export { userDB, covidDB };
