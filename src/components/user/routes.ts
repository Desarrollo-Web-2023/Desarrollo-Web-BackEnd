import express from 'express';

import {
  createUserDto,
  filterUserDto,
  getUserByIdDto,
  saveDocUserDto,
  updateUserDto
} from './joiSchema';
import { createUser, getUser, getUserById, pushOrPullDocUser, updateUser } from './controller';
import { validatorHandler } from '../../middlewares/validator.handler';

const userRouter = express.Router();

userRouter.get('/', validatorHandler(filterUserDto, 'query'), getUser);
userRouter.get('/:id', validatorHandler(getUserByIdDto, 'params'), getUserById);
userRouter.post('/', validatorHandler(createUserDto, 'body'), createUser);
userRouter.patch(
  '/saveDoc/:id',
  validatorHandler(getUserByIdDto, 'params'),
  validatorHandler(saveDocUserDto, 'body'),
  pushOrPullDocUser
);
userRouter.patch(
  '/:id',
  validatorHandler(getUserByIdDto, 'params'),
  validatorHandler(updateUserDto, 'body'),
  updateUser
);

export { userRouter };
