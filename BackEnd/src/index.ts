import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express';


const app = express();

app.use(express.json());

const PORT = process.env.API_PORT || 3010;

app.get('/', (req, res) => {
  res.status(200).send(`Rodando na porta ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});