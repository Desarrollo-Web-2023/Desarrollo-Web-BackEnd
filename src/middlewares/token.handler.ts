import Boom from '@hapi/boom';
import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/auth/token';

const checkToken = (req: Request, res: Response, next: NextFunction) => {
  const token: string | undefined = req.headers.authorization?.split('Bearer ')[1];

  if (!token) {
    next(Boom.unauthorized('Non token'));
  } else {
    try {
      const user = verifyToken(token);
      req.email = user.email;
      req.role = user.role;
      next();
    } catch (error) {
      next(Boom.unauthorized('Invalid token'));
    }
  }
};

export { checkToken };
