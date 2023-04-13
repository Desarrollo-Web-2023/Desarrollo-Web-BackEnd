import Joi from 'joi';

// eslint-disable-next-line @typescript-eslint/naming-convention
// const _id = Joi.string().alphanum().length(24);
const name = Joi.string().regex(/^[a-zA-Z]+(\s[a-zA-Z]+)*$/);
const email = Joi.string().email();
const preferences = Joi.array().items(Joi.string()).min(3);

const createUserDto = Joi.object({
  name: name.required(),
  email: email.required(),
  preferences: preferences.required()
});

export { createUserDto };
