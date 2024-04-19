import { describe, expect, test } from '@jest/globals';
import { UserModel } from '../interfaces/user';
import {  } from './user.model';
import User from './user.model';

describe('Test user functions', () =>{
  test('user prototypes', async () => {
    console.log(Object.getPrototypeOf(User));
  })
})