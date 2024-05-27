const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.register = (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  User.create({ name, email, password: hashedPassword }, (err, result) => {
    if (err) return res.status(500).send('Hubo un problema registrando al usuario.');
    res.status(201).send('Usuario registrado con éxito.');
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findByEmail(email, (err, results) => {
    if (err) return res.status(500).send('Error en el servidor.');
    if (results.length === 0) return res.status(404).send('No se encontró usuario.');

    const user = results[0];
    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) return res.status(401).send('Contraseña inválida.');

    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: 86400
    });

    res.status(200).send({ auth: true, token });
  });
};
