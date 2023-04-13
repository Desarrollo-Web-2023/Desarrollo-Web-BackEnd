import { saveUser } from './store';
import { CreateUserModel } from './types';

const createUserService = async (newUser: CreateUserModel) => {
  newUser.name = newUser.name
    .toLowerCase()
    .split(' ')
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');

  const createdUser = await saveUser(newUser);
  return createdUser;
};

export { createUserService };
