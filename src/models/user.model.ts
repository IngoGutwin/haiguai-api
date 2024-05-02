import { getDbConnection } from '../service/mariadb.service';
import { Connection } from 'mariadb';
import {
  NewUser,
  NewUserValidationResult,
  UserHashes,
  NewUserMethods,
  ValidUser,
} from '../types/user';
import { v4 as uuidV4 } from 'uuid';
import {
  generateNewUserHashes,
  validateNewPasswordRequirements,
} from '../config/password.utils';

function generateValidUserMap(user: NewUser): Map<string, string | Date> {
  const userHashes: UserHashes = generateNewUserHashes(user.password);
  const newUser: ValidUser = {
    userId: uuidV4(),
    username: user.username,
    email: user.email,
    password: userHashes.passwordHash,
    role: 'Author',
    createdAt: new Date(),
    updatedAt: new Date(),
    salt: userHashes.userSalt,
  };
  return new Map<string, string | Date>(Object.entries(newUser));
}

function NewUser({ username, email, password }: NewUser): NewUserMethods {
  const user: NewUser = {
    username: username,
    email: email,
    password: password,
  };
  /**
   * validate new user registration requirements
   * @returns NewUserValidationResult
   */
  async function validate(): Promise<NewUserValidationResult> {
    let result: NewUserValidationResult = {
      ok: false,
      message: '',
    };
    if (!validateNewPasswordRequirements(user.password)) {
      result.message = "password don't meet requirements!";
      return result;
    }
    const connection: Connection = await getDbConnection();
    try {
      const validUser: ValidUser[] = await connection.query(
        `
        SELECT * FROM Users WHERE username = ? OR email = ? 
      `,
        [user.username, user.email],
      );
      if (validUser[0]?.username == user.username || validUser[0]?.email == user.email) {
        result.message = 'User already exist!';
        return result;
      }
      const newValidUserMap = generateValidUserMap(user);
      const newValidUserKeys = Array.from(newValidUserMap.keys());
      const newValidUserValues = Array.from(newValidUserMap.values());
      await connection.query(
        `INSERT INTO Users (${newValidUserKeys.map((key) => `${key}`)}) VALUES(${newValidUserKeys.map(
          () => `?`,
        )})`,
        newValidUserValues,
      );
      result.ok = true;
      result.message = 'User created';
      return result;
    } catch (error) {
      result.message = 'Server Error occurred';
      console.log(error);
    } finally {
      connection.end();
      return result;
    }
  }

  return {
    validate,
  };
}

export function newUserFactory(user: NewUser): NewUserMethods {
  return NewUser(user);
}
