import { NextFunction, Response } from 'express';
import Boom from '@hapi/boom';

import {
  CreateDocumentRequest,
  DocumentI,
  GetDocumentByIdRequest,
  GetDocumentByQueryRequest
} from './types';
import { createDocumentServie, getDocumentByIdService, getDocumentByQueryService } from './service';
import { success } from '../../utils/response';

const createDocument = async (req: CreateDocumentRequest, res: Response, next: NextFunction) => {
  try {
    const document: DocumentI | undefined = req.file;
    if (document == undefined) {
      throw Boom.badData('Bad data');
    }
    await createDocumentServie(req.body, document.path);
    success(res, 200, 'Ok', { message: 'Ok' });
  } catch (error) {
    next(error);
  }
};

const getDocumentByQuery = async (
  req: GetDocumentByQueryRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const documentsFound = await getDocumentByQueryService(req.query);
    success(res, 200, 'Ok', documentsFound);
  } catch (error) {
    next(error);
  }
};

const getDocumentById = async (req: GetDocumentByIdRequest, res: Response, next: NextFunction) => {
  try {
    const documentFound = await getDocumentByIdService(req.params.id);
    success(res, 200, 'Ok', documentFound);
  } catch (error) {
    next(error);
  }
};

export { createDocument, getDocumentByQuery, getDocumentById };
