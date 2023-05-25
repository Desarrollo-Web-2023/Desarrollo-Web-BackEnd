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

const getDocumentByQueryDto = Joi.object({
  words: Joi.array().items(Joi.string()),
  word: Joi.string(),
  type,
  year: Joi.string().regex(/^\d{4}$/),
  collegiateBodies: Joi.string().hex().length(24)
}).min(1);

const getDocumentByIdDto = Joi.object({
  id: Joi.string().length(24)
});

export { createDocumentDto, getDocumentByQueryDto, getDocumentByIdDto };
