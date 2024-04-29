export type NewUser = {
  username: string;
  email: string;
  password: string;
  hashes?: UserHashes;
}

export interface NewUserMethods {
  validate: () => UserValidationResult;
}

export type AuthorMethods = NewUserMethods & {

}

export type Author = NewUser & {
  userId: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
  hashes?: UserHashes;
}

export type UserHashes = {
  userSalt?: string | undefined;
  passwordHash?: string | undefined;
};

export type UserJwtToken = {
  token: string | undefined;
  expires: string | undefined;
};

export type NewUserValidationResult = {
  ok: boolean;
  message?: string | null;
}
