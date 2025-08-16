import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Write() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [writer, setWriter] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch('http://localhost:4000/api/board', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, writer, content })
        });
        router.push('/');
    };

    return (
        <div className="container">
            <h1>✏️ 글쓰기</h1>
            <form onSubmit={handleSubmit}>
                <input value={title} onChange={e => setTitle(e.target.value)} placeholder="제목" required />
                <input value={writer} onChange={e => setWriter(e.target.value)} placeholder="작성자" required />
                <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="내용" rows={8} required />
                <button type="submit">등록</button>
            </form>
        </div>
    );
}