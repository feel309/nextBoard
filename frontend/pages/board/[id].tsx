import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type Board = {
    id: number;
    title: string;
    content: string;
    writer: string;
    created_at: string;
};

export default function BoardDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [board, setBoard] = useState<Board | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState('');
    const [writer, setWriter] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:4000/api/board/${id}`)
                .then(res => res.json())
                .then(data => {
                    setBoard(data);
                    setTitle(data.title);
                    setWriter(data.writer);
                    setContent(data.content);
                });
        }
    }, [id]);

    const handleUpdate = async () => {
        await fetch(`http://localhost:4000/api/board/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, writer, content })
        });
        setEditMode(false);
        router.reload();
    };

    const handleDelete = async () => {
        if (!confirm('정말 삭제하시겠습니까?')) return;
        await fetch(`http://localhost:4000/api/board/${id}`, { method: 'DELETE' });
        router.push('/');
    };

    if (!board) return <p>Loading...</p>;

    return (
        <div className="container">
            {editMode ? (
                <div className="detail-card">
                    <h1>글 수정</h1>
                    <input value={title} onChange={e => setTitle(e.target.value)} />
                    <input value={writer} onChange={e => setWriter(e.target.value)} />
                    <textarea value={content} onChange={e => setContent(e.target.value)} rows={8} />
                    <div>
                        <button onClick={handleUpdate}>수정 완료</button>
                        <button onClick={() => setEditMode(false)}>취소</button>
                    </div>
                </div>
            ) : (
                <div className="detail-card">
                    <h1>{board.title}</h1>
                    <p>{board.content}</p>
                    <p><strong>작성자:</strong> {board.writer}</p>
                    <p><strong>작성일:</strong> {new Date(board.created_at).toLocaleString()}</p>
                    <div>
                        <button onClick={() => setEditMode(true)}>수정</button>
                        <button onClick={handleDelete}>삭제</button>
                        <button onClick={() => router.push('/')}>목록</button>
                    </div>
                </div>
            )}
        </div>
    );
}