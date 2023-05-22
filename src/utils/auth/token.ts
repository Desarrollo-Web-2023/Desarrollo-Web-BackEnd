import jwt from 'jsonwebtoken';

import { config } from '../../config/config';
import { Payload } from '../../components/auth/types';

const generateToken = (data: object) => {
  return jwt.sign(data, config.jwtSecret, { expiresIn: '2h' });
};

const verifyToken = (token: string) => {
  return jwt.verify(token, config.jwtSecret) as Payload;
};

export { generateToken, verifyToken };
