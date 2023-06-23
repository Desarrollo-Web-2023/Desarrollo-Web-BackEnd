import {
  CompleteDocumentModel,
  CreateDocumentModel,
  DocumentProjectionModel,
  FoundDocumentByWordModel,
  GetDocumentByQueryModel
} from './types';
import { documentSchema } from './model';
import mongoose from 'mongoose';

const save = async (
  basicData: CreateDocumentModel,
  keywords: { word: string; frequency: number }[],
  buf: Buffer
) => {
  await documentSchema.create({ ...basicData, keywords, body: buf });
};

const find = async (
  query: GetDocumentByQueryModel,
  projection: DocumentProjectionModel = { createdAt: 0, updatedAt: 0 }
) => {
  let match: object;
  let orderBy: Record<string, 1 | -1>;
  let project: object = { ...projection };
  let projectTwo: object = { ...projection };
  const words = query.words;
  const word = query.word;
  const year = query.year;
  delete query.year;
  delete query.word;
  delete query.words;
  if (words || word) {
    match = {
      ...query,
      keywords: { $elemMatch: { word: { $in: words ? words : [word] } } }
    };
    project = {
      ...project,
      keywords: {
        $filter: {
          input: '$keywords',
          as: 'key',
          cond: {
            $in: ['$$key.word', words ? words : [word]]
          }
        }
      }
    };
    projectTwo = { ...projectTwo, freq: { $max: '$keywords.frequency' } };
    orderBy = { freq: -1 };
  } else {
    match = { ...query };
    project = { ...project };
    orderBy = { publicationDate: -1 };
  }
  if (year) {
    match = { ...match, publicationDate: { $gte: new Date(year) } };
  }
  if (query.type) {
    match = { ...match, type: { $regex: `${query.type}`, $options: 'i' } };
  }
  if (query.collegiateBodies) {
    match = {
      ...match,
      collegiateBodies: { $elemMatch: { $eq: new mongoose.Types.ObjectId(query.collegiateBodies) } }
    };
  }
  return await documentSchema.aggregate<FoundDocumentByWordModel>([
    { $match: match },
    { $project: project },
    { $project: projectTwo },
    { $sort: orderBy }
  ]);
};

const findById = async (
  id: CompleteDocumentModel['_id'],
  projection: DocumentProjectionModel = { createdAt: 0, updatedAt: 0 }
) => {
  return await documentSchema.findById(id, projection);
};

export { save, find, findById };
