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
      body: JSON.stringify({ title, content, writer })
    });
    router.push('/');
  };

  return (
    <div className="container">
      <h1>✏️ 글쓰기</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="제목"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <input
          placeholder="작성자"
          value={writer}
          onChange={e => setWriter(e.target.value)}
          required
        />
        <textarea
          placeholder="내용"
          value={content}
          onChange={e => setContent(e.target.value)}
          rows={8}
          required
        />
        <button type="submit">등록</button>
      </form>
    </div>
  );
}