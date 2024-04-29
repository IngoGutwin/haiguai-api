import * as crypto from 'crypto';
import * as jsonwebtoken from 'jsonwebtoken';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { UserHashes , UserJwtToken } from '../types/user';

const pathToPrivateKey: string = path.join(__dirname, '../../id_rsa_priv.pem');
const PRIVATE_KEY: string = fs.readFileSync(pathToPrivateKey, 'utf8');

function validatePassword(password: string, hash: string, salt: string): boolean {
  const hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex');
  return hash === hashVerify;
}

type PasswordRequirements = {
  minLength: number;
  requireUppercase: boolean,
  requireLowercase: boolean,
  requireNumbers: boolean,
  requireSpecialChars: boolean,
  specialChars: RegExp // Customize the special characters as needed
}
const passwordRequirements: PasswordRequirements = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
  specialChars: /[^A-Za-z0-9]/ // Customize the special characters as needed
}

function validateNewPasswordRequirements(password: string): boolean {
  if (password.length < passwordRequirements.minLength) {
    return false;
  }
  if (passwordRequirements.requireUppercase && !/[A-Z]/.test(password))  {
    return false;
  }
  if (passwordRequirements.requireUppercase && !/[a-z]/.test(password))  {
    return false;
  }
  if (passwordRequirements.requireNumbers && !/\d/.test(password))  {
    return false;
  }
  if (passwordRequirements.requireSpecialChars && !passwordRequirements.specialChars.test(password))  {
    return false;
  }
  return true;
}

function generateNewUserHashes(password: string): UserHashes {
  const userSalt: string = crypto.randomBytes(32).toString('hex');
  const passwordHash: string = crypto.pbkdf2Sync(password, userSalt, 10000, 64, 'sha512').toString('hex');
  return {
    userSalt,
    passwordHash,
  };
}

function issueJWT(userId: string): UserJwtToken {
  const expiresIn = '7d';
  const payload = {
    sub: userId,
    iat: Date.now(),
  };
  const signedToken = jsonwebtoken.sign(payload, PRIVATE_KEY, {
    expiresIn,
    algorithm: 'RS256',
  });
  return {
    token: `Bearer ${signedToken}`,
    expires: expiresIn,
  };
}

export {
  validatePassword,
  validateNewPasswordRequirements,
  generateNewUserHashes,
  issueJWT,
};
