const db = require('./db');
const { v4: uuidV4 } = require('uuid');
const bcrypt = require('bcrypt');

const userFactory = async ({username, email, password}) => {
  let newUser = {
    uuid: uuidV4(),
    username: username,
    email: email,
    password: password 
  };
  let sqlTableValues = [newUser.uuid, newUser.username, newUser.email, newUser.password];
  return await postUser(sqlTableValues);
};

function createMessage(postResult) {
  if (postResult.message.includes('username')) {
    postResult.message = 'username already exist';
  } else if (postResult.message.includes('email')) {
    postResult.message = 'email-address already exist';
  }
  return postResult;
}

async function postUser(sqlTableValues) {
  let sqlQuery = 'INSERT INTO users (uuid, username, email, password) VALUE (?, ?, ?, ?)';
  let postResult = await db.postQuery(sqlQuery, sqlTableValues);
  if (!postResult.ok) {
    return createMessage(postResult);
  }
  return postResult;
}


module.exports = {
  userFactory,
};
