import { blue, green } from 'kleur/colors';
import * as db from '../service/mariadb.service.js';
import { Connection } from 'mariadb';

async function getBy(tableRow: string, cellValues: Array<string>) {
  const connection: Connection = await db.getConnection();
  const [result] = await connection
    .query(`SELECT * FROM Users WHERE ${tableRow} = ?`, cellValues);
	return result;
}

// function generateCurrentDate() {
//   let date = new Date();
//   return date.toISOString();
// }

// async function registerNewUser(user) {
//   let connection = await createNewDbConnection();
//   let isEmpty = await checkIfUsersTableIsEmpty(connection);
//   user.set('role', isEmpty ? 'Admin' : 'Author');
//   const userEntries = Array.from(user.entries());
//   const userKeys = userEntries.map(([key]) => key);
//   const userValues = userEntries.map(([, value]) => value);
//   const sqlQuery = `INSERT INTO Users (${userKeys.join(', ')}, createdAt, updatedAt) VALUES (${userValues.map(() => '?').join(', ')}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`;
//   return await connection.query(sqlQuery, userValues);
// }

// async function checkIfUsersTableIsEmpty(connection) {
//   let result = await connection
//     .query('SELECT * FROM Users LIMIT 1')
//     .then((result) => result)
//     .catch((err) => err);
//   if (result.length < 1) {
//     return true;
//   } else {
//     return false;
//   }
// }

export {
  getBy,
  // registerNewUser,
  // checkIfUsersTableIsEmpty,
};
