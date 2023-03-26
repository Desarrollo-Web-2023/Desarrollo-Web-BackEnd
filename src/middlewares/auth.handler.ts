import Boom from '@hapi/boom';
import { NextFunction, Request, Response } from 'express';

import { config } from '../config/config';

const checkApiKey = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers.api;
  if (apiKey === config.apiKey) {
    next();
  } else {
    next(Boom.unauthorized());
  }
};

const checkRoles = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const role = req.role;

    if (!role) {
      next(Boom.unauthorized());
    } else {
      if (roles.includes(role)) {
        next();
      } else {
        next(Boom.unauthorized());
      }
    }
  };
};

export { checkApiKey, checkRoles };
