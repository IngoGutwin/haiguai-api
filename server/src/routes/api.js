const express = require('express');
const api = express.Router();

const userRouter = require('./users/user.router');

const apiResponse = {
  apiVersion: 1.0,
};

function sendResponse(req, res) {
  return res.status(200).json(apiResponse);
}

api.get('/version', sendResponse);

api.use('/users', userRouter); 

module.exports = api;
