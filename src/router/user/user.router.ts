const express = require('express');
import { Router } from "express";

import { httpRegisterNewUser } from "./user.controller";

const userRouter: Router = express.Router();

userRouter.post('/register', httpRegisterNewUser);

export default userRouter;