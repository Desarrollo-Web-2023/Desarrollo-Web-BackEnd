import Joi from 'joi';

const email = Joi.string().regex(/^[\w.%+-]+@unal.edu.co$/);
const password = Joi.string();

const signinDto = Joi.object({
  email: email.required(),
  password: password.required()
});

export { signinDto };
