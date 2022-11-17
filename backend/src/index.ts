import express from 'express';
import 'express-async-errors';
import * as dotenv from 'dotenv';
import errorMiddleware from './middlewares/errorMiddleware';
import TransactionRouter from './routes/transaction.route';
import UserRouter from './routes/user.route';
import cors from 'cors'

dotenv.config();

const PORT = process.env.API_PORT || 3010;

const app = express();

app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
  res.status(200).send(`Rodando na porta ${PORT}`);
});

app.use('/users', UserRouter);
app.use('/transactions', TransactionRouter);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
