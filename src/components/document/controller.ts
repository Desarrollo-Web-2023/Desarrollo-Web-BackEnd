import { NextFunction, Request, Response } from 'express';

import { DocumentI } from './types';
import { readFile } from './helper';
import Boom from '@hapi/boom';
import { success } from '../../utils/response';

const createDocument = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const document: DocumentI | undefined = req.file;
    if (document == undefined) {
      throw Boom.badData('Bad data');
    }
    await readFile(document.path);
    // frequency(document.path);
    success(res, 200, 'Ok', { message: 'Ok' });
  } catch (error) {
    next(error);
  }
};

export { createDocument };
