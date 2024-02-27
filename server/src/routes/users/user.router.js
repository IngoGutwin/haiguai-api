const express = require('express');

const { 
  httpGetAllUsers, 
  httpGetUserFromUserName, 
  httpPostNewUser,
  httpUserLoginRequest } = require('./user.controller');


const userRouter = express.Router();

userRouter.get('/', httpGetAllUsers);
userRouter.get('/:eMail', httpGetUserFromUserName);
userRouter.post('/', httpPostNewUser);
userRouter.post('/login', httpPostNewUser);

module.exports = userRouter;
