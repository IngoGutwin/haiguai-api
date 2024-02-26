const express = require('express');

const { getHomePage } = require('./home.controller');

const homeRouter = express.Router();

homeRouter.get('/', getHomePage);

module.exports = homeRouter;
