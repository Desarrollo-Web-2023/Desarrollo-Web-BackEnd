import Boom from '@hapi/boom';
import {
  findCollegiateBody,
  findCollegiateBodyById,
  saveCollegiateBody,
  updateCollegiateBody
} from './store';
import { CreateCollegiateBodyModel, FilterCollegiateBodyModel, CollegiateBodyModel } from './types';

const createCollegiateBodyService = async (newCollegiateBody: CreateCollegiateBodyModel) => {
  function capitalCase(name: string): string {
    return name
      .toLowerCase()
      .split(' ')
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
  }
  newCollegiateBody.name = capitalCase(newCollegiateBody.name);

  newCollegiateBody.admins = newCollegiateBody.admins.map(capitalCase);

  const createdCollegiateBody = await saveCollegiateBody(newCollegiateBody);
  return createdCollegiateBody;
};

const getCollegiateBodyService = async (filter?: FilterCollegiateBodyModel) => {
  if (filter?.admins && Array.isArray(filter?.admins))
    filter.admins = { $in: filter?.admins.map((word) => word.toLowerCase()) };

  const collegiateBody = await findCollegiateBody(filter);
  if (!collegiateBody) throw Boom.notFound('Collegiate Body not found');

  return collegiateBody;
};

const getCollegiateBodyByIdService = async (id: CollegiateBodyModel['_id']) => {
  const collegiateBody = await findCollegiateBodyById(id);
  if (!collegiateBody) throw Boom.notFound('Collegiate Body not found');

  return collegiateBody;
};

const updateCollegiateBodyService = async (
  id: CollegiateBodyModel['_id'],
  admins: CollegiateBodyModel['admins'],
  updated: CollegiateBodyModel['updated']
) => {
  admins = admins.map((a) => a.toLowerCase());
  const updatedCollegiateBody = await updateCollegiateBody(id, admins, updated);
  if (!updatedCollegiateBody) throw Boom.notFound('Collegiate Body not found');

  return updatedCollegiateBody;
};

export {
  createCollegiateBodyService,
  getCollegiateBodyService,
  getCollegiateBodyByIdService,
  updateCollegiateBodyService
};
