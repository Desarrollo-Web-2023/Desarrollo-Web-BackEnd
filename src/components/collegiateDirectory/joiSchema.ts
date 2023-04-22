import Joi from 'joi';

// eslint-disable-next-line @typescript-eslint/naming-convention
const _id = Joi.string().alphanum().length(24);
const collegiateBody = _id;
const user = _id;
const isActive = Joi.boolean().truthy('true').falsy('false');

const createColDirDto = Joi.object({
  collegiateBody: collegiateBody.required(),
  user: user.required(),
  isActive
});

const filterColDirDto = Joi.object({
  collegiateBody,
  user,
  isActive
});

const getColDirByIdDto = Joi.object({
  id: _id.required()
});

const updateColDirDto = Joi.object({
  isActive: isActive.required()
});

export { createColDirDto, filterColDirDto, getColDirByIdDto, updateColDirDto };
