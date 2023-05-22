import {
  CompleteDocumentModel,
  CreateDocumentModel,
  DocumentProjectionModel,
  FoundDocumentByWordModel
} from './types';
import { documentSchema } from './model';

const save = async (
  basicData: CreateDocumentModel,
  keywords: { word: string; frequency: number }[],
  buf: Buffer
) => {
  await documentSchema.create({ ...basicData, keywords, body: buf });
};

const find = async (
  words: string[],
  projection: DocumentProjectionModel = { createdAt: 0, updatedAt: 0 }
) => {
  return await documentSchema.aggregate<FoundDocumentByWordModel>([
    { $match: { keywords: { $elemMatch: { word: { $in: words } } } } },
    {
      $project: {
        ...projection,
        keywords: {
          $filter: {
            input: '$keywords',
            as: 'key',
            cond: {
              $in: ['$$key.word', words]
            }
          }
        }
      }
    },
    {
      $project: {
        ...projection,
        freq: { $max: '$keywords.frequency' }
      }
    }
  ]);
};

const findById = async (
  id: CompleteDocumentModel['_id'],
  projection: DocumentProjectionModel = { createdAt: 0, updatedAt: 0 }
) => {
  return await documentSchema.findById(id, projection);
};

export { save, find, findById };
