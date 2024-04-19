import mysql from 'mysql2/promise';
import { env } from '$env/dynamic/private';
import type { Connection } from 'mysql2/promise';

export async function ConnectDb(): Promise<Connection> {
  let db: Connection = await mysql.createConnection({
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB_NAME,
  });

  return db;
}