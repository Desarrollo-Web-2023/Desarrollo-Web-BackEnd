import Boom from '@hapi/boom';
import fs from 'fs';

import { extractContent, frequency } from './helper';
import { CompleteDocumentModel, CreateDocumentModel } from './types';
import { find, findById, save } from './store';

const createDocumentServie = async (basicInfo: CreateDocumentModel, path: string) => {
  try {
    const buf = fs.readFileSync(path);
    const data = await extractContent(buf);
    const freq = await frequency(data);
    await save(basicInfo, freq, buf);
    fs.rmSync(path);
  } catch (error) {
    throw Boom.badImplementation('Internal server error');
  }
};

const getDocumentByWordService = async (words: string[]) => {
  const documentsFound = await find(words, {
    title: 1,
    type: 1,
    collegiateBodies: 1,
    publicationDate: 1,
    entryIntoForce: 1,
    expeditionDate: 1
  });
  return documentsFound;
};

const getDocumentByIdService = async (id: CompleteDocumentModel['_id']) => {
  const documentFound = await findById(id);
  if (!documentFound) {
    throw Boom.badRequest('Document not found');
  }

  return documentFound;
};

export { createDocumentServie, getDocumentByWordService, getDocumentByIdService };
