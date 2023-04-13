import express from 'express';
import { validatorHandler } from '../../middlewares/validator.handler';
import { createUserDto } from './joiSchema';
import { createUser } from './controller';

const userRouter = express.Router();

userRouter.post('/', validatorHandler(createUserDto, 'body'), createUser);

export { userRouter };
