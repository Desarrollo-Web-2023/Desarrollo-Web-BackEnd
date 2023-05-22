import { NextFunction, Response } from 'express';

import { SigninRequest } from './types';
import { success } from '../../utils/response';
import { signinService } from './service';

const signin = async (req: SigninRequest, res: Response, next: NextFunction) => {
  try {
    const token = await signinService(req.body);
    success(res, 200, 'Ok', token);
  } catch (error) {
    next(error);
  }
};

export { signin };
