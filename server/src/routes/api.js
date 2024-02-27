const express = require('express');
const api = express.Router();

const authRouter = require('./authentication/authentication.router');

api.use('/', authRouter); 

module.exports = api;
