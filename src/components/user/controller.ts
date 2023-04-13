import { NextFunction, Response } from 'express';
import { createUserService } from './service';
import { success } from '../../utils/response';
import { CreateUserRequest } from './types';

const createUser = async (req: CreateUserRequest, res: Response, next: NextFunction) => {
  try {
    const body = req.body;
    const createdUser = await createUserService(body);
    success(res, 201, 'User create successful', createdUser);
  } catch (error) {
    next(error);
  }
};

export { createUser };
