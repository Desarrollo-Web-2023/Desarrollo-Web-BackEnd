import { Request } from 'express';

type CompleteDocumentModel = {
  title: string;
  type: string;
  collegiateBodies: string;
  publicationDate: Date;
  entryIntoForce: Date;
  expeditionDate: Date;
  keywords: {
    word: string;
    frequency: number;
  };
  body: string;
  createdAt: Date;
  updatedAt: Date;
};

type DocumentProjectionModel = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  _id?: 1 | 0;
  title?: 1 | 0;
  type?: 1 | 0;
  collegiateBodies?: 1 | 0;
  publicationDate?: 1 | 0;
  entryIntoForce?: 1 | 0;
  expeditionDate?: 1 | 0;
  keywords?: 1 | 0;
  body?: 1 | 0;
  createdAt?: 1 | 0;
  updatedAt?: 1 | 0;
};

type CreateDocumentModel = Pick<
  CompleteDocumentModel,
  'title' | 'type' | 'collegiateBodies' | 'publicationDate' | 'entryIntoForce' | 'expeditionDate'
>;

interface CreateDocumentRequest extends Request {
  body: CreateDocumentModel;
}

interface DocumentI {
  originalname: string;
  filename: string;
  path: string;
  size: number;
}

type LegalDocument = Omit<CompleteDocumentModel, 'createdAt' | 'updatedAt'>;

type GetDocumentByWordModel = {
  words: string[];
};

interface GetDocumentByWordRequest extends Request {
  query: GetDocumentByWordModel;
}

type FoundDocumentByWordModel = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  _id: string;
  title: string;
  type: string;
  collegiateBodies: string;
  publicationDate: Date;
  entryIntoForce: Date;
  expeditionDate: Date;
};

export {
  CompleteDocumentModel,
  LegalDocument,
  DocumentI,
  CreateDocumentModel,
  CreateDocumentRequest,
  DocumentProjectionModel,
  GetDocumentByWordModel,
  GetDocumentByWordRequest,
  FoundDocumentByWordModel
};
