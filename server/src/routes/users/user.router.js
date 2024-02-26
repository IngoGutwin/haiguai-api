const express = require('express');

const { httpGetAllUsers, httpGetUserFromUserName, httpPostNewUser } = require('./user.controller');


const userRouter = express.Router();

userRouter.get('/', httpGetAllUsers);
userRouter.get('/:eMail', httpGetUserFromUserName);
userRouter.post('/', httpPostNewUser);

module.exports = userRouter;
