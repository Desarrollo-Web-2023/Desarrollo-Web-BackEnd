import multer, { Multer } from 'multer';
import express from 'express';

import { createDocument } from './controller';
import { storage } from './helper';

const upload: Multer = multer({ storage: storage });
const documentRouter = express.Router();

documentRouter.post('/', upload.single('Doc'), createDocument);

export { documentRouter };
