import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import boardRouter from './routes/board';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/board', boardRouter);

app.listen(4000, () => {
  console.log('Backend server running on http://localhost:4000');
});