import Joi from 'joi';

const title = Joi.string();
const type = Joi.string();
const collegiateBodies = Joi.array().items(Joi.string());
const publicationDate = Joi.date();
const entryIntoForce = Joi.date();
const expeditionDate = Joi.date();

const createDocumentDto = Joi.object({
  title: title.required(),
  type: type.required(),
  collegiateBodies: collegiateBodies.required(),
  publicationDate: publicationDate.required(),
  entryIntoForce: entryIntoForce.required(),
  expeditionDate: expeditionDate.required()
});

const getDocumentByWordDto = Joi.object({
  words: Joi.array().items(Joi.string()).required()
});

const getDocumentByIdDto = Joi.object({
  id: Joi.string().length(24)
});

export { createDocumentDto, getDocumentByWordDto, getDocumentByIdDto };
