import express from 'express';
import { validatorHandler } from '../../middlewares/validator.handler';
import { createUserDto, filterUserDto, getUserByIdDto, updateUserDto } from './joiSchema';
import { createUser, getUser, getUserById, updateUser } from './controller';

const userRouter = express.Router();

userRouter.get('/', validatorHandler(filterUserDto, 'query'), getUser);
userRouter.get('/:id', validatorHandler(getUserByIdDto, 'params'), getUserById);
userRouter.post('/', validatorHandler(createUserDto, 'body'), createUser);
userRouter.patch(
  '/:id',
  validatorHandler(getUserByIdDto, 'params'),
  validatorHandler(updateUserDto, 'body'),
  updateUser
);

export { userRouter };
