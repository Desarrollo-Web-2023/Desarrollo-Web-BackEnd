import multer, { Multer } from 'multer';
import express from 'express';

import { createDocument, getDocumentById, getDocumentByQuery } from './controller';
import { validatorHandler } from '../../middlewares/validator.handler';
import { getDocumentByIdDto, getDocumentByQueryDto } from './joiSchema';
import { storage } from './helper';

const upload: Multer = multer({ storage: storage });
const documentRouter = express.Router();

documentRouter.post('/', upload.single('Doc'), createDocument);
documentRouter.get('/', validatorHandler(getDocumentByQueryDto, 'query'), getDocumentByQuery);
documentRouter.get('/:id', validatorHandler(getDocumentByIdDto, 'params'), getDocumentById);

export { documentRouter };
