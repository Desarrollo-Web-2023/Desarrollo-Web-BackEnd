import { Request } from 'express';
import { ObjectId } from 'mongoose';

type UserModel = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  _id: ObjectId;
  name: string;
  email: string;
  preferences: string[];
};

type CreateUserModel = Omit<UserModel, '_id'>;

interface CreateUserRequest extends Request {
  body: CreateUserModel;
}

export { UserModel, CreateUserModel, CreateUserRequest };
