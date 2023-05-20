import multer, { Multer } from 'multer';
import express from 'express';

import { validatorHandler } from '../../middlewares/validator.handler';
import { createDocument, getDocumentByWord } from './controller';
import { storage } from './helper';
import { getDocumentByWordDto } from './joiSchema';

const upload: Multer = multer({ storage: storage });
const documentRouter = express.Router();

documentRouter.post('/', upload.single('Doc'), createDocument);
documentRouter.get('/', validatorHandler(getDocumentByWordDto, 'query'), getDocumentByWord);

export { documentRouter };
