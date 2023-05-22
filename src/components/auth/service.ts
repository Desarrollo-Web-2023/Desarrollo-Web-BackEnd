import Boom from '@hapi/boom';

import { generateToken } from '../../utils/auth/token';
import { find } from '../collegiateDirectory/store';
import { getUserService } from '../user/service';
import { SigninModel } from './types';
import { findByEmail } from './store';

const signinService = async (authData: SigninModel) => {
  const { email, password } = authData;

  const authUser = await findByEmail(email);
  if (!authUser) {
    throw Boom.unauthorized('Invalid email or password');
  }

  const validPassword = await authUser?.comparePasswords(password);
  if (!validPassword) {
    throw Boom.unauthorized('Invalidemail or password');
  }

  const user = (await getUserService({ email }))[0];

  const collegiateBodies = await find({ user: user._id });

  return { token: generateToken({ idUser: user._id, collegiateBodies }) };
};

export { signinService };
