import mybatisMapper from 'mybatis-mapper';
import mysql from 'mysql2/promise';
import path from 'path';

// XML 매퍼 등록
mybatisMapper.createMapper([
  path.join(__dirname, '../mappers/boardMapper.xml')
]);

// DB 커넥션 풀 생성
export const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '0490',
  database: 'boarddb',
  connectionLimit: 10
});

// mybatis-mapper를 이용한 쿼리 실행 함수
export function queryMapper(namespace: string, sqlId: string, params?: any) {
  const query = mybatisMapper.getStatement(namespace, sqlId, params, { language: 'sql', indent: '  ' });
  return pool.query(query);
}