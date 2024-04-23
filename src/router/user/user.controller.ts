import { bold, green, red } from 'kleur/colors';
import { Request, Response } from "express";
import User from '../../models/user.model';
import { UserModel, UserValidationResult } from '../../interfaces/user';

/**
 * validate and prepare user data for the database 
 * @param req 
 * @param res 
 * @returns 
 */
function httpRegisterNewUser(req: Request, res: Response): Response {
  const isUserValid: UserValidationResult = User(req.body);
  if (!isUserValid.ok) {
    return res.status(400).json({ok: isUserValid.ok, error: isUserValid.message});
  }
  return res.status(201).json({ok: isUserValid.ok, message: isUserValid.message, user: req.body});
}

export {
  httpRegisterNewUser,
}
