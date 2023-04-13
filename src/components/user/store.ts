import { userSchema } from './model';
import { CreateUserModel } from './types';

const saveUser = async (newUser: CreateUserModel) => {
  await userSchema.create(newUser);
  return newUser;
};

export { saveUser };
