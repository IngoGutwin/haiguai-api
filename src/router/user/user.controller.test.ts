import { describe, expect, test } from '@jest/globals';
import request, { Response } from 'supertest';
import app from '../../app';

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

    const responseMessage = response.body.message;
    expect(responseMessage).toBe('password don\'t meet requirements!');
  });

  test('It should respond with 201 success and RequestObject', async () => {
    const newBetterPassword = 'AEj808.3?jA'
    testUserOne.password = newBetterPassword;
    
    const response: Response = await request(app)
      .post('/api/1/user/register')
      .send(testUserOne)
      .expect('Content-Type', /json/)
      .expect(201);

    const responseBody = response.body.message;
    expect(responseBody).toBe('User created');
  });

  test('It should respond with 400 Error User already exists', async () => {
    const newBetterPassword = 'AEj808.3?jA'
    testUserOne.password = newBetterPassword;
    const response: Response = await request(app)
      .post('/api/1/user/register')
      .send(testUserOne)
      .expect('Content-Type', /json/)
      .expect(400);

    const responseBody = response.body.message;
    expect(responseBody).toBe('User already exist!');
  });
});
