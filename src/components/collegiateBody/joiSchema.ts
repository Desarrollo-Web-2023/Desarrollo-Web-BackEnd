import Joi from 'joi';

// eslint-disable-next-line @typescript-eslint/naming-convention
const _id = Joi.string().alphanum().length(24);
const name = Joi.string().regex(/^[a-zA-Z]+(\s[a-zA-Z]+)*$/);
const admins = Joi.array().items(Joi.string());

const createCollegiateBodyDto = Joi.object({
  name: name.required(),
  admins: admins.required()
});

const filterCollegiateBodyDto = Joi.object({
  name,
  admins: admins.min(1)
});

const updateCollegiateBodyDto = Joi.object({
  admins: admins.required()
});

const getCollegiateBodyByIdDto = Joi.object({
  id: _id
});

export {
  createCollegiateBodyDto,
  filterCollegiateBodyDto,
  getCollegiateBodyByIdDto,
  updateCollegiateBodyDto
};
