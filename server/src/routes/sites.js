const express = require('express');
const sitesRouter = express.Router();

const homeRouter = require('./home/home.route');

sitesRouter.use(homeRouter);

module.exports = sitesRouter;
