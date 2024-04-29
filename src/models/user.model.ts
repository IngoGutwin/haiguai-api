import { getDbConnection } from '../service/mariadb.service';
import { Connection } from 'mariadb';
import {
  NewUser,
  Author,
  NewUserValidationResult,
  UserHashes,
  NewUserMethods,
} from '../types/user';
import { v4 as uuidV4 } from 'uuid';
import { generateNewUserHashes, validateNewPasswordRequirements } from '../config/password.utils';
import { use } from 'passport';

/**
 * save new user to database
 * @param user
 * @param userValues
 */
async function add(user: Author, userValues: Map<string, string>): Promise<void> {
  // const connection: Connection = await getDbConnection();
}

/**
 * return all user attributes of a user
 * @param attributeName name of user attribute (Table Column)
 * @param attributes given user attribute value
 * @returns
 */
async function getBy(attributeName: string, attributeValue: Array<string>) {
  const connection: Connection = await getDbConnection();
  try {
    const [result] = await connection.query(
      `SELECT * FROM Users WHERE ${attributeName} = ?`,
      [attributeValue],
    );
    return result;
  } catch (err) {
    console.log(err);
  } finally {
    connection.end();
  }
}

// function createNewUserMap(
//   username: string,
//   email: string,
//   hashes: UserHashes,
// ): Map<string, string> {
//   const creationDate = new Date().toISOString();
//   const newUuid = uuidV4();
//   const user: Map<keyof Author, string> = new Map([
//     ['userId', newUuid],
//     ['username', username],
//     ['email', email],
//     ['hashes', hashes],
//     ['role', 'Author'],
//     ['createdAt', creationDate],
//     ['updatedAt', creationDate],
//   ]);
//   return user;
// }

/**
 * validate if the user has input all required fields 
 * @param user NewUser
 * @returns 
 */
function validateUserFields(user: NewUser): NewUserValidationResult {
  const result: NewUserValidationResult = {
    ok: false,
    message: '' 
  }
  if (user.username === undefined) {
    result.message = 'no username provided';
    return result
  } else if (user.email === undefined) {
    result.message = 'no email provided';
    return result
  } else if (user.password === undefined) {
    result.message = 'no password provided';
    return result
  }
  result.ok = true;
  return result;
}

function User({ username, email, password }: NewUser): NewUserMethods {
  const user: NewUser = {
    username: username,
    email: email,
    password: password,
  };
  /**
   * validate new user registration requirements
   * @returns NewUserValidationResult
   */
  function validate(): NewUserValidationResult {
    const result: NewUserValidationResult = {
      ok: false,
      message: null,
    };
    const areUserFieldsValid: NewUserValidationResult = validateUserFields(user);
    if (!areUserFieldsValid.ok) {
      return areUserFieldsValid;
    }
    const isPasswordValid: boolean = validateNewPasswordRequirements(user.password);
    if (!isPasswordValid) {
      result.message = 'password don\'t meet requirements!';
      return result;
    }
     
    result.ok = true;
    result.message = 'user created';
    return result;
  }

  return {
    validate,
  };
}

export function userFactory(user: NewUser): NewUserMethods {
  return User(user);
}
