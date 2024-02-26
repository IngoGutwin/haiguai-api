const user = require('../../models/user.model');

function httpGetAllUsers(req, res) {
  // return res.status(200).json(getAllUsers());
}

function httpGetUserFromUserName(req, res) {
  //if (getUserFromUserName(req.params.eMail)) {}
  // return res.status(200).json(getUserFromUserName(req.params.eMail));
}

async function httpPostNewUser(req, res) {
  let createUserResult = await user.userFactory(req.body);
  if (createUserResult.ok) {
    return res.status(200).json(createUserResult);
  } 
  return res.status(400).json(createUserResult);
}

module.exports = {
  httpGetAllUsers,
  httpGetUserFromUserName,
  httpPostNewUser,
};
