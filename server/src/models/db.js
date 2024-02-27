const mariadb = require('mariadb');
require('dotenv').config();
const dbHelper = require('./db.helper');

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
 * @async
 * @function
 * @returns {Promise<Connection>}
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
 * send a new Query to database
 * @function
 * @param { sqlQuery, Array, }
 * @returns {Object}
 */
async function postQuery(sqlQuery, writableData) {
  let connection;
  try {
    connection = await fetchNewConnection();
    return {
      ok: true,
      queryResult: await connection.query(sqlQuery, writableData),
    };
  } catch (err) {
    return {
      ok: false,
      message: err.sqlMessage,
    };
  } finally {
    connection.end();
  }
}

/**
 * interface
 * @async
 * @function
 * @param { Array }
 * @returns { Object }
 *
 */
async function getUsersPassword(sqlTableValues) {
  let sqlQuery = 'SELECT password FROM users WHERE username = ? OR email = ?';
  let result = await postQuery(sqlQuery, sqlTableValues);
  if (!result.ok || result.queryResult[0] === undefined) {
    return { ok: false, message: 'no such user!' };
  }
  return {
    ok: true,
    password: result.queryResult[0].password,
  };
}

/**
 * interface
 * @async
 * @function
 * @param { Array }
 * @returns { Object }
 *
 */
async function postNewUser(sqlTableValues) {
  let sqlQuery = 'INSERT INTO users (uuid, username, email, password) VALUE (?, ?, ?, ?)';
  let result = await postQuery(sqlQuery, sqlTableValues);
  if (result.ok) {
    return {
      ok: true,
      message: 'new User created',
    };
  }
  return dbHelper.createErrorMessage(result);
}

module.exports = {
  pool,
  postNewUser,
  getUsersPassword,
};
