import { Request, Response } from 'express';
import { newUserFactory } from '../../models/user.model';
import { NewUserValidationResult, NewUserMethods } from '../../types/user';

/**
 * create new User and run the validation function 
 * @param req
 * @param res
 * @returns
 */
async function httpRegisterNewUser(req: Request, res: Response): Promise<Response> {
  const NewUser: NewUserMethods = newUserFactory(req.body);
  const isUserValid: NewUserValidationResult = await NewUser.validate();
  if (!isUserValid.ok) {
    return res.status(400).json({ ok: isUserValid.ok, message: isUserValid.message });
  }
  return res.status(201).json({ ok: isUserValid.ok, message: isUserValid.message });
}

export { httpRegisterNewUser };
