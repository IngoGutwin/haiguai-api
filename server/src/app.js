const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');

const sitesRouter = require('./routes/sites');
const api = require('./routes/api');

app.use(
  cors({
    origin: 'http://localhost:8000',
  }),
);

app.use(morgan('combined'));

app.use(express.json());

app.use('/api', api);
app.use(sitesRouter);

module.exports = app;
