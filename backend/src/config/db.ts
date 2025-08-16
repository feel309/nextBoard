import mybatisMapper from 'mybatis-mapper';
import mysql from 'mysql2/promise';
import path from 'path';

mybatisMapper.createMapper([
  path.join(__dirname, '../mappers/boardMapper.xml')
]);

export const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '0490',
  database: 'boarddb',
  connectionLimit: 10
});

export function queryMapper(namespace: string, sqlId: string, params?: any) {
  const query = mybatisMapper.getStatement(namespace, sqlId, params, { language: 'sql', indent: '  ' });
  return pool.query(query);
}