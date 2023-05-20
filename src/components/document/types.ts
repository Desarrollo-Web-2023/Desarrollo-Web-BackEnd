type CompleteDocument = {
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

interface DocumentI {
  originalname: string;
  filename: string;
  path: string;
  size: number;
}

type LegalDocument = Omit<CompleteDocument, 'createdAt' | 'updatedAt'>;

export { CompleteDocument, LegalDocument, DocumentI };
