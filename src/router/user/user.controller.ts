import { Request, Response } from "express";

function httpRegisterNewUser(req: Request, res: Response) {
  console.log(req.body);
  return res.status(200).json({ok: true, message: 'User created'});
}

export {
  httpRegisterNewUser,
}