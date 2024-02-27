const bcrypt = require('bcrypt');
const saltRounds = Number.parseInt(process.env.SALT_ROUNDS);

/**
 * generate a hashed String
 * @async
 * @function
 * @param {String} password
 * @returns {String} hashed password
 */
async function hashPassword(password) {
  try {
    let salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    console.error(error);
  }
}

/**
 * compare password with saved hash
 * @async
 * @function
 * @param {String, String} hashed password, user input
 * @returns {Boolean}
 */
async function comparePassword(hashedPassword, password) {
  try {
    let isValidate = await bcrypt.compare(password, hashedPassword);
    console.log('validate: ', isValidate);
    return isValidate;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  hashPassword,
  comparePassword,
};
