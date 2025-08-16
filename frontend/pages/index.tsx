import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Board {
  id: number;
  title: string;
  writer: string;
  created_at: string;
}

export default function Home() {
  const [boards, setBoards] = useState<Board[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/board')
      .then(res => res.json())
      .then(data => setBoards(data));
  }, []);

  return (
    <div className="container">
      <h1>📋 게시판</h1>
      <Link href="/write" className="button">글쓰기</Link>
      <ul className="post-list">
        {boards.map(board => (
          <li key={board.id}>
            <strong>{board.title}</strong>
            <small>{board.writer} · {new Date(board.created_at).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}