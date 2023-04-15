import { Request } from 'express';
import { ObjectId } from 'mongoose';

type UserModel = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  _id: ObjectId | string;
  name: string;
  email: string;
  preferences: string[];
};

type CreateUserModel = Omit<UserModel, '_id'>;

type FilterUserModel = {
  name?: UserModel['name'];
  email?: UserModel['email'];
  preferences?: UserModel['preferences'] | { $in: UserModel['preferences'] };
};

interface CreateUserRequest extends Request {
  body: CreateUserModel;
}

interface GetUserFilterRequest extends Request {
  query: FilterUserModel;
}

interface GetUserByIdRequest extends Request {
  params: {
    id: string;
  };
}

interface UpdateUserRequest extends Request {
  params: {
    id: string;
  };
  body: Pick<UserModel, 'preferences'>;
}

export {
  UserModel,
  CreateUserModel,
  CreateUserRequest,
  FilterUserModel,
  GetUserFilterRequest,
  GetUserByIdRequest,
  UpdateUserRequest
};
