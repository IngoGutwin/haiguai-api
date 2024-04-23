export interface NewUser {
  username?: string;
  email?: string;
  password?: string;
}

export interface UserModel {
  userId?: string;
  username?: string;
  email?: string;
  password?: string;
  userSalt?: string;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserHashes {
  userSalt: string,
  passwordHash: string
}

export interface UserJwtToken {
  token: string,
  expires: string
}

export interface UserValidationResult {
  ok: boolean;
  message?: string | null;
}