import Joi from 'joi';

// eslint-disable-next-line @typescript-eslint/naming-convention
const _id = Joi.string().alphanum().length(24);
const name = Joi.string().regex(/^[a-zA-Z]+(\s[a-zA-Z]+)*$/);
const email = Joi.string().email();
const password = Joi.string();
const preferences = Joi.array().items(Joi.string()).min(3);

const createUserDto = Joi.object({
  name: name.required(),
  email: email.required(),
  password: password.required(),
  preferences: preferences.required()
});

const filterUserDto = Joi.object({
  name,
  email,
  preferences: preferences.min(1)
});

const updateUserDto = Joi.object({
  preferences: preferences.required()
});

const getUserByIdDto = Joi.object({
  id: _id
});

export { createUserDto, filterUserDto, getUserByIdDto, updateUserDto };
