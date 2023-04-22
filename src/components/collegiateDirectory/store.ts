import { ColDirModel, CreateColDirModel, FilterColDirModel, ProjectionsColDirModel } from './types';
import { colDirSchema } from './model';

const save = async (newColDir: CreateColDirModel): Promise<CreateColDirModel> => {
  await colDirSchema.create(newColDir);
  return newColDir;
};

const find = async (
  filter: FilterColDirModel = { isActive: true },
  projections: ProjectionsColDirModel = { createdAt: 0, updatedAt: 0 }
): Promise<ColDirModel[]> => {
  return await colDirSchema.find(filter, projections);
};

const findById = async (id: ColDirModel['_id']): Promise<ColDirModel | null> => {
  return await colDirSchema.findById(id);
};

export { save, find, findById };
