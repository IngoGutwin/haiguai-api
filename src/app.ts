const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
import 'dotenv/config';
import { Express } from 'express';
import apiV1 from './router/api.router';

// import passportConfig from './config/passport.mjs';

const app: Express = express();

// passportConfig(passport);
// app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: 'http://localhost:4321',
  })
);

app.use(morgan(':method :http-version :status :referrer :date'));
app.use('/api/1', apiV1);

export default app;