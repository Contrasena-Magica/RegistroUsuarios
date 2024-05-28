import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('./routes/auth.js', authRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
