import express from 'express';
import { queryMapper } from '../config/db';
import { Board } from '../types/board';

const router = express.Router();

router.get('/', async (req, res) => {
  const [rows] = await queryMapper('Board', 'selectBoardList');
  res.json(rows);
});

router.post('/', async (req, res) => {
  const board: Board = req.body;
  await queryMapper('Board', 'insertBoard', board);
  res.json({ message: 'success' });
});

export default router;