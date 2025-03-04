import jwt from 'jsonwebtoken';
import { Unauthorized } from '../middlewares';
import { JwtPayload } from '../types';

export class TokenService {
  static createAuthToken(payload: { userId: string; role: string }): string {
    if (!process.env.JWT_AUTH_SECRET) {
      throw new Error('JWT_AUTH_SECRET is not defined');
    }

    return jwt.sign(payload, process.env.JWT_AUTH_SECRET, {
      expiresIn: process.env.JWT_AUTH_EXPIRY || '1d',
    } as jwt.SignOptions);
  }

  static verifyAuthToken(token: string): Promise<JwtPayload> {
    return new Promise((resolve, reject) => {
      if (!process.env.JWT_AUTH_SECRET) {
        return reject(new Error('JWT_AUTH_SECRET is not defined'));
      }

      jwt.verify(token, process.env.JWT_AUTH_SECRET, (err, decoded) => {
        if (err || !decoded) {
          return reject(new Unauthorized('Invalid authentication token'));
        }
        resolve(decoded as JwtPayload);
      });
    });
  }
}
