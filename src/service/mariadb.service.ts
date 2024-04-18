import 'dotenv/config';
import mariadb, { Connection, Pool } from 'mariadb';
const { DB_HOST, DB_PORT, DB_NAME, DB_PASSWORD, DB_USER } =
  process.env as NodeJS.ProcessEnv;

const pool: Pool = mariadb.createPool({
  host: DB_HOST,
  user: DB_USER,
  port: DB_PORT,
  password: DB_PASSWORD,
  database: DB_NAME,
  connectionLimit: 100,
});

async function getConnection(): Promise<Connection> {
  console.log('Total connections: ', pool.totalConnections());
  console.log('Active connections: ', pool.activeConnections());
  console.log('Idle connections: ', pool.idleConnections());
  return await pool.getConnection();
}

export { getConnection };
