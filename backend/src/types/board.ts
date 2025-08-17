// Board 인터페이스 (타입 정의)
export interface Board {
    id?: number;         // 선택적 속성 (INSERT 시 자동 생성)
    title: string;       // 제목
    content: string;     // 내용
    writer: string;      // 작성자
    created_at?: Date;   // 작성일 (DB에서 자동 생성)
}