import express from 'express';
import { queryMapper } from '../config/db';
import { Board } from '../types/board';

const router = express.Router();

// 전체 목록
router.get('/', async (_req, res) => {
    const [rows] = await queryMapper('Board', 'selectBoardList');
    res.json(rows);
});

// 상세 조회
router.get('/:id', async (req, res) => {
    const [rows] = await queryMapper('Board', 'selectBoardById', { id: req.params.id });
    res.json(Array.isArray(rows) ? rows[0] : null);
});

// 글 등록
router.post('/', async (req, res) => {
    const board: Board = req.body;
    await queryMapper('Board', 'insertBoard', board);
    res.json({ message: 'created' });
});

// 글 수정
router.put('/:id', async (req, res) => {
    const board: Board = { ...req.body, id: Number(req.params.id) };
    await queryMapper('Board', 'updateBoard', board);
    res.json({ message: 'updated' });
});

// 글 삭제
router.delete('/:id', async (req, res) => {
    await queryMapper('Board', 'deleteBoardById', { id: req.params.id });
    res.json({ message: 'deleted' });
});

export default router;