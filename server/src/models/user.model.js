require('dotenv').config();
const db = require('./db');
const { v4: uuidV4 } = require('uuid');
const { hashPassword, comparePassword } = require('../utils/hashing.passwords');

function response(success, message) {
  return {
    ok: success,
    message: message,
  };
}

/**
 * create new User, return false if User exist
 * encrypt the passwort
 * @async
 * @function
 * @param {Object<Request} param0 the request body
 * @param {*} param0.username
 * @param {*} param0.firstname
 * @param {*} param0.lastname
 * @param {*} param0.email
 * @param {*} param0.password
 */
async function createNewUser({ username, firstname, lastname, email, password }) {
  let newUser = {
    uuid: uuidV4(),
    username: username,
    firstname: firstname ? undefined : '',
    lasttname: lastname ? undefined : '',
    email: email,
    password: await hashPassword(password),
  };
  let sqlTableValues = [newUser.uuid, newUser.username, newUser.email, newUser.password];
  let result = await db.postNewUser(sqlTableValues);
  return result.ok ? response(true, result.message) : response(false, result.message);
}

/**
 * check if user exist in database, return false if not
 * checks the hashed password
 * @async
 * @function
 * @param {Object<Request} param0 the request body
 * @param {*} param0.username
 * @param {*} param0.email
 * @param {*} param0.password
 */
async function loginUser({ username, email, password }) {
  let sqlTableValues = [username, email];
  let isPassword = await db.getUsersPassword(sqlTableValues);
  if (!isPassword.ok) {
    return isPassword;
  }
  let isPasswordValid = await comparePassword(isPassword.password, password);
  return isPasswordValid
    ? response(true, 'validation success!')
    : response(false, 'wrong password!');
}

module.exports = {
  createNewUser,
  loginUser,
};
