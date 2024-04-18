const express = require('express');
import { Router } from "express";

import { httpRegisterNewUser } from "./user.controller.js";

const userRouter: Router = express.Router();

userRouter.get('/register', httpRegisterNewUser);

export default userRouter;