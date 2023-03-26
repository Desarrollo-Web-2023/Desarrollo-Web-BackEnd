import Boom from '@hapi/boom';
import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

type Properties = 'params' | 'query' | 'body';

const validatorHandler = (schema: Joi.ObjectSchema, property: Properties) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      next(Boom.badRequest(error.message));
    }
    next();
  };
};

export { validatorHandler };
