import Joi from 'joi';

// eslint-disable-next-line @typescript-eslint/naming-convention
const _id = Joi.string().alphanum().length(24);
const name = Joi.string().regex(/^[a-zA-Z]+(\s[a-zA-Z]+)*$/);
const admins = Joi.array().items(Joi.string());
const created = Joi.string();
const updated = Joi.string();

const createCollegiateBodyDto = Joi.object({
  name: name.required(),
  admins: admins.required(),
  created: created.required(),
  updated: updated.required(),
});

const filterCollegiateBodyDto = Joi.object({
  name,
  admins: admins.min(1),
  created,
  updated,
});

const updateCollegiateBodyDto = Joi.object({
  admins: admins.required(),
  updated: updated.required(),
});

const getCollegiateBodyByIdDto = Joi.object({
  id: _id
});

export { createCollegiateBodyDto, filterCollegiateBodyDto, getCollegiateBodyByIdDto, updateCollegiateBodyDto };
