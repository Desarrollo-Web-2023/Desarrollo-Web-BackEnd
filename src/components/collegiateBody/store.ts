import { collegiateBodySchema } from './model';
import { CreateCollegiateBodyModel, FilterCollegiateBodyModel, CollegiateBodyModel } from './types';

const saveCollegiateBody = async (newCollegiateBody: CreateCollegiateBodyModel) => {
  await collegiateBodySchema.create(newCollegiateBody);
  return newCollegiateBody;
};

const findCollegiateBody = (filter: FilterCollegiateBodyModel = {}) => {
  const collegiateBody = collegiateBodySchema.find(filter);
  return collegiateBody;
};

const findCollegiateBodyById = (id: CollegiateBodyModel['_id']) => {
  const collegiateBody = collegiateBodySchema.findById(id);
  return collegiateBody;
};

const updateCollegiateBody = (id: CollegiateBodyModel['_id'], admins: CollegiateBodyModel['admins'], updated: CollegiateBodyModel['updated']) => {
  const updatedCollegiateBody = collegiateBodySchema.findByIdAndUpdate(id, { $set: { admins, updated } }, { new: true });
  return updatedCollegiateBody;
};

export { saveCollegiateBody, findCollegiateBody, findCollegiateBodyById, updateCollegiateBody };
