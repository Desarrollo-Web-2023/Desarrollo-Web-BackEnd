import Boom from '@hapi/boom';

import { ColDirModel, CreateColDirModel, FilterColDirModel } from './types';
import { find, findById, save, deactivate } from './store';

const createColDirService = async (newColDir: CreateColDirModel): Promise<ColDirModel> => {
  await save(newColDir);
  const createdColDir = await getColDirService({
    collegiateBody: newColDir.collegiateBody,
    user: newColDir.user
  });
  return createdColDir[0];
};

const getColDirService = async (filter?: FilterColDirModel): Promise<ColDirModel[]> => {
  const foundColDir: ColDirModel[] = await find(filter);
  if (!foundColDir) {
    throw Boom.notFound('Collegiate directory not found');
  }
  return foundColDir;
};

const getColDirByidService = async (id: ColDirModel['_id']): Promise<ColDirModel> => {
  const foundColDir: ColDirModel | null = await findById(id);
  if (!foundColDir) {
    throw Boom.notFound('Collegiate directory not found');
  }
  return foundColDir;
};

const deactivateColDirService = async (id: ColDirModel['_id']): Promise<ColDirModel> => {
  const updatedColDir: ColDirModel | null = await deactivate(id);
  if (!updatedColDir) {
    throw Boom.notFound('Collegiate directory not found');
  }
  return updatedColDir;
};

export { createColDirService, getColDirService, getColDirByidService, deactivateColDirService };
