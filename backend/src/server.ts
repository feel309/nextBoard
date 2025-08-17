import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import boardRouter from './routes/board';

const app = express();
app.use(cors()); // CORS 허용
app.use(bodyParser.json()); // JSON 파싱

app.use('/api/board', boardRouter); // 라우터 등록

app.listen(4000, () => {
    console.log('Backend running on http://localhost:4000');
});