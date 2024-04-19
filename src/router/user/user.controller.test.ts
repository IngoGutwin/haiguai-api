import { describe, expect, test } from '@jest/globals';
import request, { Response } from 'supertest';
import app from '../../app';
import { genPassword, checkPasswordRequirements } from '../../config/password.utils';
import { UserHashes } from '../../interfaces/user';

describe('Test new User Registration POST /api/1/user/register', () => {

  const testUserOne = {
    username: 'testUserOne',
    email: 'test@test.com',
    password: 'securePassword',
  };

  test('It should respond with 400 bad request and the testUser object', async () => {
    const response: Response = await request(app)
      .post('/api/1/user/register')
      .send(testUserOne)
      .expect('Content-Type', /json/)
      .expect(400);

    const responseMessage = response.body.error;
    expect(responseMessage).toBe('Password not meet requirements');
  });

  test('It should respond with 201 success and the testUser object', async () => {
    const newBetterPassword = 'AEj808.3?jA'
    testUserOne.password = newBetterPassword;
    
    const response: Response = await request(app)
      .post('/api/1/user/register')
      .send(testUserOne)
      .expect('Content-Type', /json/)
      .expect(201);

    const responseBody = response.body.user;
    expect(responseBody).toStrictEqual(testUserOne);
  });
});

describe('Test provided password', () => {
  const password = {
    one: 'test123',
    two: 'Test123.Ds'
  }
  test('it should return false', async () => {
    const passwordMeetsRequirements = checkPasswordRequirements(password.one);
    expect(passwordMeetsRequirements).toBe(false);
  });

  test('it should return true', async () => {
    const passwordMeetsRequirements = checkPasswordRequirements(password.two);
    expect(passwordMeetsRequirements).toBe(true);
  });

  test('it should generate a hash from user password', async () => {
    const { userSalt, passwordHash }: UserHashes = genPassword(password.two);
    expect(typeof userSalt).toBe('string');
    expect(userSalt.length).toBe(64);
    expect(typeof passwordHash).toBe('string');
    expect(passwordHash.length).toBe(128);
  });
});
