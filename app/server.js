// server.js
import express from 'express';
import { covidDB } from './config/database';

const app = express();
const PORT = 4000;

app.get('/data', (req, res) => {
  const sql = 'SELECT continent, SUM(cases) AS total_cases FROM covid GROUP BY continent';
  covidDB.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Error al realizar la consulta:', err.message);
      res.status(500).send('Error en el servidor al consultar datos');
      return;
    }
    res.json(rows);
  });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
