import fs from 'node:fs';
import path from 'node:path';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import * as User from '../models/user.model';

const pathToPubKey = path.join(__dirname, '../../id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToPubKey, 'utf8');

async function verifyCallback(
  jwtPayload: string,
  done: (arg0: null, arg1: boolean) => any,
) {
  const userId = jwtPayload[0];
  console.log(userId);
  const user: object = User.getBy('userId', [userId]);
  if (user) {
    return done(null, true);
  }
  return done(null, false);
}

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ['RS256'],
};

export default (passport: { use: (arg0: Strategy) => void }) => {
  passport.use(new Strategy(options, verifyCallback));
};
