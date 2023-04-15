import { userSchema } from './model';
import { CreateUserModel, FilterUserModel, UserModel } from './types';

const saveUser = async (newUser: CreateUserModel) => {
  await userSchema.create(newUser);
  return newUser;
};

const findUser = (filter: FilterUserModel = {}) => {
  const user = userSchema.find(filter);
  return user;
};

const findUserById = (id: UserModel['_id']) => {
  const user = userSchema.findById(id);
  return user;
};

const updateUser = (id: UserModel['_id'], preferences: UserModel['preferences']) => {
  const updatedUser = userSchema.findByIdAndUpdate(id, { $set: { preferences } }, { new: true });
  return updatedUser;
};

export { saveUser, findUser, findUserById, updateUser };
