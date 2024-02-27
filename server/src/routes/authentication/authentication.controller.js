const user = require('./../../models/user.model');

/**
 * sign-up a new user
 * @async
 * @function
 * @return {Object}
 */
async function httpPostNewUser(req, res) {
  let createUserResult = await user.createNewUser(req.body);
  if (createUserResult.ok) {
    return res.status(200).json(createUserResult);
  }
  return res.status(400).json(createUserResult);
}

/**
 * login user
 * @async
 * @function
 * @return {Object}
 */
async function httpLoginUser(req, res) {
  let loginResult = await user.loginUser(req.body);
  if (loginResult.ok) {
    return res.status(200).json(loginResult);
  }
  return res.status(400).json(loginResult);
}

module.exports = {
  httpPostNewUser,
  httpLoginUser,
};
