import { NextFunction, Response } from 'express';
import {
  createUserService,
  getUserByIdService,
  getUserService,
  updateUserService
} from './service';
import { success } from '../../utils/response';
import {
  CreateUserRequest,
  GetUserByIdRequest,
  GetUserFilterRequest,
  UpdateUserRequest
} from './types';

const createUser = async (req: CreateUserRequest, res: Response, next: NextFunction) => {
  try {
    const body = req.body;
    const createdUser = await createUserService(body);
    success(res, 201, 'User create successful', createdUser);
  } catch (error) {
    next(error);
  }
};

const getUser = async (req: GetUserFilterRequest, res: Response, next: NextFunction) => {
  try {
    const user = await getUserService(req.query);
    success(res, 200, 'Ok', user);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req: GetUserByIdRequest, res: Response, next: NextFunction) => {
  try {
    const user = await getUserByIdService(req.params.id);
    success(res, 200, 'Ok', user);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req: UpdateUserRequest, res: Response, next: NextFunction) => {
  try {
    const updatedUser = await updateUserService(req.params.id, req.body.preferences);
    success(res, 200, 'User update successful', updatedUser);
  } catch (error) {
    next(error);
  }
};

export { createUser, getUser, getUserById, updateUser };
