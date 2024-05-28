import db from '../config/db.js';

const User = {
  create: (data, callback) => {
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(query, [data.name, data.email, data.password], callback);
  },
  findByEmail: (email, callback) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], callback);
  }
};

export default User;
