import 'dotenv/config';
const mariadb = require('mariadb');
import { Pool, PoolConnection } from 'mariadb';
const { DB_HOST, DB_PORT, DB_NAME, DB_PASSWORD, DB_USER } =
  process.env as NodeJS.ProcessEnv;

const dbCredentials = { 
  host: DB_HOST,
  user: DB_USER,
  port: DB_PORT,
  password: DB_PASSWORD,
  database: DB_NAME,
}

const pool: Pool = mariadb.createPool({ ...dbCredentials, connectionLimit: 10 });

function logDbConnections(pool: Pool) {
  console.log('Total connections: ', pool.totalConnections());
  console.log('Active connections: ', pool.activeConnections());
  console.log('Idle connections: ', pool.idleConnections());
}

async function getPoolConnection(): Promise<PoolConnection>  {
  logDbConnections(pool);
  return pool.getConnection();
}

async function getDbConnection() {
  return await mariadb.createConnection(dbCredentials);
}

export {
  getPoolConnection,
  getDbConnection
}
