export type NewUser = {
  username: string;
  email: string;
  password: string;
}

export interface NewUserMethods {
  validate: () => Promise<NewUserValidationResult>;
}

export type UserHashes = {
  userSalt: string;
  passwordHash: string;
};

export type ValidUser = NewUser & {
  userId: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
  salt?: string;
}

export type UserJwtToken = {
  token: string | undefined;
  expires: string | undefined;
};

export type NewUserValidationResult = {
  ok: boolean;
  message?: string | null;
}
