import { getDbConnection } from '../service/mariadb.service';
import { Connection } from 'mariadb';
import { NewUser, UserModel, UserValidationResult } from '../interfaces/user';
import { v4 as uuidV4 } from 'uuid';
import { checkPasswordRequirements } from '../config/password.utils';

async function add({ username, password, userSalt, email }: UserModel) {}

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

function getNewUserMap(
  username: string,
  email: string,
  passwordHash: string,
  userSalt: string,
): Map<string, string> {
  const creationDate = new Date().toISOString();
  const newUuid = uuidV4();
  const user: Map<string, string> = new Map([
    ['userId', newUuid],
    ['username', username],
    ['email', email],
    ['passwordHash', passwordHash],
    ['userSalt', userSalt],
    ['role', 'Author'],
    ['createdAt', creationDate],
    ['updatedAt', creationDate],
  ]);
  return user;
}
/**
 * checks if provided data is valid
 * @param userAttributes user attributes from request body
 */
const validate = ({ username, email, password }): UserValidationResult => {
  const result: UserValidationResult = {
    ok: false,
    message: null,
  };
  if (username === undefined) {
    result.message = 'no username provided';
    return result;
  } else if (email === undefined) {
    result.message = 'no email provided';
    return result;
  } else if (password === undefined || !checkPasswordRequirements(password)) {
    result.message = "password don't meet requirements";
    return result;
  }
  result.ok = true;
  return result;
};

const User = (
  { username, email, password }: UserModel,
  validate: UserValidationResult,
): UserValidationResult => {
  const user = { username, email, password, validate };
  return { ok: false };
}

function userFactory(user: NewUser): UserValidationResult {

  return { ok: false };
}

export default userFactory;
