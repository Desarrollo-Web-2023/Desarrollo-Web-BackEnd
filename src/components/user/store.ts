import { userSchema } from './model';
import { CreateUserModel, FilterUserModel, UserModel } from './types';

const saveUser = async (newUser: CreateUserModel) => {
  await userSchema.create(newUser);
  return newUser;
};

const findUser = async (filter: FilterUserModel = {}): Promise<UserModel[]> => {
  return await userSchema.find<UserModel>(filter);
};

const findUserById = async (id: UserModel['_id']): Promise<UserModel | null> => {
  return await userSchema.findById<UserModel>(id);
};

const updateUser = async (
  id: UserModel['_id'],
  preferences: UserModel['preferences']
): Promise<UserModel | null> => {
  return await userSchema.findByIdAndUpdate<UserModel>(
    id,
    { $set: { preferences } },
    { new: true }
  );
};

const pushDocUser = async (
  id: UserModel['_id'],
  doc: UserModel['_id']
): Promise<UserModel | null> => {
  return await userSchema.findByIdAndUpdate<UserModel>(
    id,
    { $push: { saved: doc } },
    { new: true }
  );
};

const pullDocUser = async (
  id: UserModel['_id'],
  doc: UserModel['_id']
): Promise<UserModel | null> => {
  return await userSchema.findByIdAndUpdate<UserModel>(
    id,
    { $pull: { saved: doc } },
    { new: true }
  );
};

export { saveUser, findUser, findUserById, updateUser, pushDocUser, pullDocUser };
