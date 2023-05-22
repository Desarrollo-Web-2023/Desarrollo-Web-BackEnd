import { ColDirModel, CreateColDirModel, FilterColDirModel, ProjectionsColDirModel } from './types';
import { colDirSchema } from './model';

const save = async (newColDir: CreateColDirModel): Promise<CreateColDirModel> => {
  await colDirSchema.create(newColDir);
  return newColDir;
};

const find = async (
  filter: FilterColDirModel = { isActive: true },
  // eslint-disable-next-line @typescript-eslint/naming-convention
  projections: ProjectionsColDirModel = { createdAt: 0, updatedAt: 0, _id: 0, user: 0 }
): Promise<ColDirModel[]> => {
  return await colDirSchema.find(filter, projections).populate({
    path: 'CollegiateBody',
    select: 'name'
  });
};

const findById = async (id: ColDirModel['_id']): Promise<ColDirModel | null> => {
  return await colDirSchema.findById(id);
};

const deactivate = async (id: ColDirModel['_id']) => {
  const updatedColDir = await colDirSchema.findByIdAndUpdate<ColDirModel>(
    id,
    { $set: { isActive: false } },
    { new: true, projection: { createdAt: 0, updatedAt: 0 } }
  );
  return updatedColDir;
};

export { save, find, findById, deactivate };
