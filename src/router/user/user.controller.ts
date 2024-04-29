import { bold, green, red } from 'kleur/colors';
import { Request, Response } from "express";
import { userFactory } from '../../models/user.model';
import { UserValidationResult, NewUser, NewUserMethods } from '../../types/user';

/**
 * validate and prepare user data for the database 
 * @param req 
 * @param res 
 * @returns 
 */
function httpRegisterNewUser(req: Request, res: Response): Response {
  const newUser: NewUserMethods = userFactory(req.body);
  const isUserValid: UserValidationResult = newUser.validate();
  if (!isUserValid.ok) {
    return res.status(400).json({ok: isUserValid.ok, error: isUserValid.message});
  }
  return res.status(201).json({ok: isUserValid.ok, message: isUserValid.message, user: req.body});
}

export {
  httpRegisterNewUser,
}
