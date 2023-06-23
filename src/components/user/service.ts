import Boom from '@hapi/boom';
import { findUser, findUserById, pushDocUser, pullDocUser, saveUser, updateUser } from './store';
import { CreateUserModel, FilterUserModel, UserModel } from './types';
import { capitalCase } from '../../utils/helpers';
import { saveAuthUser } from '../auth/store';

/**
 * Create new user
 * @param newUser New user to create
 * @returns Created user
 */
const createUserService = async (newUser: CreateUserModel) => {
  newUser.name = capitalCase(newUser.name);

  newUser.preferences = newUser.preferences.map((word) => word.toLowerCase());

  await saveUser(newUser);
  const createdUser = (await findUser({ email: newUser.email }))[0];
  await saveAuthUser({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _id: createdUser._id,
    email: createdUser.email,
    password: newUser.password
  });
  return createdUser;
};

/**
 * User list filter by name, email or preferences
 * @param filter Filter to find an user list
 * @returns User list filter by name, email or preferences
 */
const getUserService = async (filter?: FilterUserModel): Promise<UserModel[]> => {
  if (filter?.preferences && Array.isArray(filter?.preferences))
    filter.preferences = { $in: filter?.preferences.map((word) => word.toLowerCase()) };

  const user = await findUser(filter);
  if (!user) throw Boom.notFound('User not found');

  return user;
};

/**
 * User filter by Id
 * @param id Id to find an user
 * @returns User filter by id
 */
const getUserByIdService = async (id: UserModel['_id']): Promise<UserModel> => {
  const user = await findUserById(id);
  if (!user) throw Boom.notFound('User not found');

  return user;
};

/**
 * Update preferences user by id
 * @param id Id to update an user
 * @param preferences New array of preferences to update
 * @returns Updated user
 */
const updateUserService = async (
  id: UserModel['_id'],
  preferences: UserModel['preferences']
): Promise<UserModel> => {
  preferences = preferences.map((p) => p.toLowerCase());
  const updatedUser = await updateUser(id, preferences);
  if (!updatedUser) throw Boom.notFound('User not found');

  return updatedUser;
};

/**
 * Update push or pull docs user by id
 * @param id Id to update an user
 * @param doc New document to save in the list of saved documents
 * @returns Updated user
 */
const pushOrPullDocUserService = async (
  id: UserModel['_id'],
  doc: UserModel['_id'],
  mode: 'push' | 'pull' = 'push'
): Promise<UserModel> => {
  let updatedUser: UserModel | null = null;
  if (mode === 'push') {
    updatedUser = await pushDocUser(id, doc);
  } else if (mode === 'pull') {
    updatedUser = await pullDocUser(id, doc);
  }
  if (!updatedUser) throw Boom.notFound('User not found');

  return updatedUser;
};

export {
  createUserService,
  getUserService,
  getUserByIdService,
  updateUserService,
  pushOrPullDocUserService
};
