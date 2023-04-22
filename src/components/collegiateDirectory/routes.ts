import express from 'express';

import { createColDirDto, filterColDirDto, getColDirByIdDto } from './joiSchema';
import { validatorHandler } from '../../middlewares/validator.handler';
import { createColDir, getColDir, getColDirById, deactivateColDir } from './controller';

const colDirRouter = express.Router();

colDirRouter.post('/', validatorHandler(createColDirDto, 'body'), createColDir);
colDirRouter.get('/', validatorHandler(filterColDirDto, 'query'), getColDir);
colDirRouter.get('/:id', validatorHandler(getColDirByIdDto, 'params'), getColDirById);
colDirRouter.delete('/:id', validatorHandler(getColDirByIdDto, 'params'), deactivateColDir);

export { colDirRouter };
