import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import UserRouter from './routes/user.route';

const PORT = process.env.API_PORT || 3010;

const app = express();

app.use(express.json());


app.get('/', (req, res) => {
  res.status(200).send(`Rodando na porta ${PORT}`);
});

app.use('/users', UserRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
