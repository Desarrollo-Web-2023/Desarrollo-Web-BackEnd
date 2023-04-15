import { collegiateBodySchema } from './model';
import { CreateCollegiateBodyModel, FilterCollegiateBodyModel, CollegiateBodyModel } from './types';

const saveCollegiateBody = async (newCollegiateBody: CreateCollegiateBodyModel) => {
  await collegiateBodySchema.create(newCollegiateBody);
  return newCollegiateBody;
};

const findCollegiateBody = async (
  filter: FilterCollegiateBodyModel = {}
): Promise<CollegiateBodyModel[]> => {
  const collegiateBody = await collegiateBodySchema
    .find<CollegiateBodyModel>(filter, {
      createdAt: 0,
      updatedAt: 0
    })
    .populate({
      path: 'admins',
      select: 'name email'
    });
  return collegiateBody;
};

const findCollegiateBodyById = async (
  id: CollegiateBodyModel['_id']
): Promise<CollegiateBodyModel | null> => {
  const collegiateBody = await collegiateBodySchema
    .findById<CollegiateBodyModel>(id, {
      createdAt: 0,
      updatedAt: 0
    })
    .populate({
      path: 'admins',
      select: 'name email'
    });
  return collegiateBody;
};

const updateCollegiateBody = async (
  id: CollegiateBodyModel['_id'],
  admins: CollegiateBodyModel['admins']
): Promise<CollegiateBodyModel | null> => {
  const updatedCollegiateBody = await collegiateBodySchema
    .findByIdAndUpdate<CollegiateBodyModel>(
      id,
      { $set: { admins } },
      { new: true, projection: { createdAt: 0, updatedAt: 0 } }
    )
    .populate({
      path: 'admins',
      select: 'name email'
    });
  return updatedCollegiateBody;
};

export { saveCollegiateBody, findCollegiateBody, findCollegiateBodyById, updateCollegiateBody };
