import Link from 'next/link';
import { useEffect, useState } from 'react';

type Board = { id: number; title: string; writer: string; created_at: string };

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
                {boards.map(b => (
                    <li key={b.id}>
                        <Link href={`/board/${b.id}`}>{b.title}</Link>
                        <div>
                            <small>{b.writer} · {new Date(b.created_at).toLocaleString()}</small>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}