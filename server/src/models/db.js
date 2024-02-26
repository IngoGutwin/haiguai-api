const mariadb = require('mariadb');
const path = require('node:path');
require('dotenv').config();

const connectionConfig = {
  host: process.env.MARIADB_HOST,
  port: process.env.MARIADB_PORT,
  user: process.env.MARIADB_USER,
  password: process.env.MARIADB_PASSWORD,
  database: process.env.MARIADB_DATABASE,
  connectionLimit: 100,
};

const pool = mariadb.createPool(connectionConfig);

/**
 * Creates a new db connection
 * @function
 * @returns {Promise<import('mariadb').Connection}
 * @throws {Error}
 */
async function fetchNewConnection() {
  let connection = await pool.getConnection();
  console.log('Total connections: ', pool.totalConnections());
  console.log('Active connections: ', pool.activeConnections());
  console.log('Idle connections: ', pool.idleConnections());
  return connection;
}

/**
 * write a new Query to database
 * @function
 * @param {Promise<connection>, sqlQuery, Array, }
 * @returns {Object}
 */
async function postQuery(sqlQuery, writableData) {
  let connection;
  try {
    connection = await fetchNewConnection();
    await connection.query(sqlQuery, writableData);
    return {
      ok: true,
      message: 'new user created',
    };
  } catch (err) {
    console.error(err);
    return {
      ok: false,
      message: err.sqlMessage
    };
  } finally {
    connection.end();
  }
}

module.exports = {
  postQuery,
};
