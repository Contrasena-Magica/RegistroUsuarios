import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const register = (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  User.create({ name, email, password: hashedPassword }, (err, result) => {
    if (err) return res.status(500).send('There was a problem registering the user.');
    res.status(201).send('User registered successfully.');
  });
};

export const login = (req, res) => {
  const { email, password } = req.body;

  User.findByEmail(email, (err, results) => {
    if (err) return res.status(500).send('Error on the server.');
    if (results.length === 0) return res.status(404).send('No user found.');

    const user = results[0];
    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) return res.status(401).send('Invalid password.');

    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: 86400
    });

    res.status(200).send({ auth: true, token });
  });
};
