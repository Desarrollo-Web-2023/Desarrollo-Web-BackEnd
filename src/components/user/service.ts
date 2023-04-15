import Boom from '@hapi/boom';
import { findUser, findUserById, saveUser, updateUser } from './store';
import { CreateUserModel, FilterUserModel, UserModel } from './types';

const createUserService = async (newUser: CreateUserModel) => {
  newUser.name = newUser.name
    .toLowerCase()
    .split(' ')
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');

  newUser.preferences = newUser.preferences.map((word) => word.toLowerCase());

  const createdUser = await saveUser(newUser);
  return createdUser;
};

const getUserService = async (filter?: FilterUserModel): Promise<UserModel[]> => {
  if (filter?.preferences && Array.isArray(filter?.preferences))
    filter.preferences = { $in: filter?.preferences.map((word) => word.toLowerCase()) };

  const user = await findUser(filter);
  if (!user) throw Boom.notFound('User not found');

  return user;
};

const getUserByIdService = async (id: UserModel['_id']): Promise<UserModel> => {
  const user = await findUserById(id);
  if (!user) throw Boom.notFound('User not found');

  return user;
};

const updateUserService = async (
  id: UserModel['_id'],
  preferences: UserModel['preferences']
): Promise<UserModel> => {
  preferences = preferences.map((p) => p.toLowerCase());
  const updatedUser = await updateUser(id, preferences);
  if (!updatedUser) throw Boom.notFound('User not found');

  return updatedUser;
};

export { createUserService, getUserService, getUserByIdService, updateUserService };
