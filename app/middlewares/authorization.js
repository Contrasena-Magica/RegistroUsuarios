app.post('/login', (req, res) => {
  const user = { id: 1, username: 'user' }; // Ajusta esto según tu lógica de usuario
  const token = jwt.sign({ user }, SECRET, { expiresIn: '1h' });
  res.json({ token });
});
