import { NextFunction, Response } from 'express';
import {
  createUserService,
  getUserByIdService,
  getUserService,
  pushOrPullDocUserService,
  updateUserService
} from './service';
import { success } from '../../utils/response';
import {
  CreateUserRequest,
  GetUserByIdRequest,
  GetUserFilterRequest,
  SaveDocUserRequest,
  UpdateUserRequest
} from './types';

/**
 * Create new user
 * @param req.body New user information
 */
const createUser = async (req: CreateUserRequest, res: Response, next: NextFunction) => {
  try {
    const body = req.body;
    const createdUser = await createUserService(body);
    success(res, 201, 'User create successful', createdUser);
  } catch (error) {
    next(error);
  }
};

/**
 * Return user list filter by name, email or preferences
 * @param req.query Filter to find user list
 */
const getUser = async (req: GetUserFilterRequest, res: Response, next: NextFunction) => {
  try {
    const user = await getUserService(req.query);
    success(res, 200, 'Ok', user);
  } catch (error) {
    next(error);
  }
};

/**
 * Return user filter by Id
 * @param req.params.id Id to find an user
 */
const getUserById = async (req: GetUserByIdRequest, res: Response, next: NextFunction) => {
  try {
    const user = await getUserByIdService(req.params.id);
    success(res, 200, 'Ok', user);
  } catch (error) {
    next(error);
  }
};

/**
 * Update preferences user by id
 * @param req.params.id Id to update an user
 * @param req.body.preferences New array of preferences to update
 */
const updateUser = async (req: UpdateUserRequest, res: Response, next: NextFunction) => {
  try {
    const updatedUser = await updateUserService(req.params.id, req.body.preferences);
    success(res, 200, 'User update successful', updatedUser);
  } catch (error) {
    next(error);
  }
};

/**
 * Update pull or push docs user by id
 * @param req.params.id Id to update an user
 * @param req.body.doc New document to save in the list of saved documents
 */
const pushOrPullDocUser = async (req: SaveDocUserRequest, res: Response, next: NextFunction) => {
  try {
    const updatedUser = await pushOrPullDocUserService(req.params.id, req.body.doc, req.body.mode);
    success(res, 200, 'Doc saved successful', updatedUser);
  } catch (error) {
    next(error);
  }
};

export { createUser, getUser, getUserById, updateUser, pushOrPullDocUser };
