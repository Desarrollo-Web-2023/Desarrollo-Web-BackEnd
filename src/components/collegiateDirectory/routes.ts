import express from 'express';

import { createColDirDto, filterColDirDto, getColDirByIdDto, updateColDirDto } from './joiSchema';
import { validatorHandler } from '../../middlewares/validator.handler';
import { createColDir, getColDir, getColDirById } from './controller';

const colDirRouter = express.Router();

colDirRouter.post('/', validatorHandler(createColDirDto, 'body'), createColDir);
colDirRouter.get('/', validatorHandler(filterColDirDto, 'query'), getColDir);
colDirRouter.get('/:id', validatorHandler(getColDirByIdDto, 'params'), getColDirById);
colDirRouter.patch(
  '/:id',
  validatorHandler(getColDirByIdDto, 'params'),
  validatorHandler(updateColDirDto, 'body'),
  updateColDir
);

export { colDirRouter };
