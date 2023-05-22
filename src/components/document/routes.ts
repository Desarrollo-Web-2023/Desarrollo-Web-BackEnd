import multer, { Multer } from 'multer';
import express from 'express';

import { createDocument, getDocumentById, getDocumentByWord } from './controller';
import { validatorHandler } from '../../middlewares/validator.handler';
import { getDocumentByIdDto, getDocumentByWordDto } from './joiSchema';
import { storage } from './helper';

const upload: Multer = multer({ storage: storage });
const documentRouter = express.Router();

documentRouter.post('/', upload.single('Doc'), createDocument);
documentRouter.get('/', validatorHandler(getDocumentByWordDto, 'query'), getDocumentByWord);
documentRouter.get('/:id', validatorHandler(getDocumentByIdDto, 'params'), getDocumentById);

export { documentRouter };
