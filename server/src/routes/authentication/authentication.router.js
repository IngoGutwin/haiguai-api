const express = require('express');
const { httpPostNewUser, httpLoginUser } = require('./authentication.controller');

const authRouter = express.Router();

authRouter.post('/login', httpLoginUser);
authRouter.post('/signup', httpPostNewUser);

module.exports = authRouter;
