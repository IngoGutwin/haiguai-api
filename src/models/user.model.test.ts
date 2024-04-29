import { describe, expect, test } from '@jest/globals';
import { NewUser, NewUserMethods, NewUserValidationResult } from '../types/user';
import { userFactory } from './user.model';

describe('Test user functions', () => {
  const newUser: NewUserMethods = userFactory({ username: 'Test User', email: 'test@test.com', password: 'kdkad987AFD..asdf3',});

  test('create new User and check the password validation', async () => {
    const isUserValid: NewUserValidationResult = newUser.validate();
    expect(isUserValid.ok).toBe(true);
  });
});
