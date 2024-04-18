const express = require('express');
import { Router } from "express";

import userRouter from "./user/user.router";

const apiRouterV1: Router = express.Router();

apiRouterV1.use('/user', userRouter);

export default apiRouterV1;