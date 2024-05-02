import { describe, expect, test } from '@jest/globals';
import { NewUser, NewUserMethods, NewUserValidationResult } from '../types/user';
import { newUserFactory } from './user.model';

describe('Test user functions', () => {
  test('create new User, it should be true else false if user already exist', async () => {
    const newUser: NewUserMethods = newUserFactory({ username: 'testUserEins', email: 'testeins@user.com', password: 'kdkad987AFD..asdf3',});
    const isUserValid: NewUserValidationResult = await newUser.validate();
    expect(isUserValid.ok).toBe(true);
    console.log(isUserValid)
  });

  test('if user already exists, with existing email', async () => {
    const newUser: NewUserMethods = newUserFactory({ username: 'testUserEins', email: 'testeins@user.com', password: 'kdkad987AFD..asdf3',});
    const isUserValid: NewUserValidationResult = await newUser.validate();
    expect(isUserValid.ok).toBe(false);
    console.log(isUserValid)
  });
});
