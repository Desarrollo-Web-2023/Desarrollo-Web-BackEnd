import express from 'express';
import { validatorHandler } from '../../middlewares/validator.handler';
import {
  createCollegiateBodyDto,
  filterCollegiateBodyDto,
  getCollegiateBodyByIdDto,
  updateCollegiateBodyDto
} from './joiSchema';
import {
  createCollegiateBody,
  getCollegiateBody,
  getCollegiateBodyById,
  updateCollegiateBody
} from './controller';

const collegiateBodyRouter = express.Router();

collegiateBodyRouter.get(
  '/',
  validatorHandler(filterCollegiateBodyDto, 'query'),
  getCollegiateBody
);
collegiateBodyRouter.get(
  '/:id',
  validatorHandler(getCollegiateBodyByIdDto, 'params'),
  getCollegiateBodyById
);
collegiateBodyRouter.post(
  '/',
  validatorHandler(createCollegiateBodyDto, 'body'),
  createCollegiateBody
);
collegiateBodyRouter.patch(
  '/:id',
  validatorHandler(getCollegiateBodyByIdDto, 'params'),
  validatorHandler(updateCollegiateBodyDto, 'body'),
  updateCollegiateBody
);

export { collegiateBodyRouter };
