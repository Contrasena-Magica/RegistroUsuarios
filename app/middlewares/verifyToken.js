const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send('Token requerido');
  
    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) return res.status(500).send('Token inválido');
      req.user = decoded.user;
      next();
    });
  };
  
  app.get('/protected', verifyToken, (req, res) => {
    res.send('Acceso concedido');
  });
  