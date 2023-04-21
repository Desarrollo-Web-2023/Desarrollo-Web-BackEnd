import Boom from '@hapi/boom';

import { CreateCollegiateBodyModel, FilterCollegiateBodyModel, CollegiateBodyModel } from './types';
import { find, findById, save, update } from './store';
import { getUserByIdService } from '../user/service';
import { capitalCase } from '../../utils/helpers';

/**
 * create collegiate body
 * @param newCollegiateBody receive a name and list of admin ids
 * @returns collegiate body created
 */
const createCollegiateBodyService = async (newCollegiateBody: CreateCollegiateBodyModel) => {
  newCollegiateBody.name = capitalCase(newCollegiateBody.name);

  await Promise.all(newCollegiateBody.admins.map(async (id) => await getUserByIdService(id)));

  const createdCollegiateBody = await save(newCollegiateBody);
  return createdCollegiateBody;
};

/**
 * get all collegiate body by filters
 * @param filter by name and list of admin ids
 * @returns list of found collegiate body objects
 */
const getCollegiateBodyService = async (filter?: FilterCollegiateBodyModel) => {
  if (filter?.admins && Array.isArray(filter?.admins)) filter.admins = { $in: filter?.admins };
  const collegiateBody = await find(filter);
  if (!collegiateBody) throw Boom.notFound('Collegiate Body not found');

  return collegiateBody;
};

/**
 * get a collegiate body by id
 * @param id id to find a collegiate body object
 * @returns collegiate body object found
 */
const getCollegiateBodyByIdService = async (id: CollegiateBodyModel['_id']) => {
  const collegiateBody = await findById(id);
  if (!collegiateBody) throw Boom.notFound('Collegiate Body not found');

  return collegiateBody;
};

/**
 * update a collegiate body by id
 * @param id id to update a collegiate body object
 * @param admins list of admin ids to update
 * @returns updated collegiate body object
 */
const updateCollegiateBodyService = async (
  id: CollegiateBodyModel['_id'],
  admins: CollegiateBodyModel['admins']
) => {
  await Promise.all(admins.map(async (id) => await getUserByIdService(id)));

  const updatedCollegiateBody = await update(id, admins);
  if (!updatedCollegiateBody) throw Boom.notFound('Collegiate Body not found');

  return updatedCollegiateBody;
};

export {
  createCollegiateBodyService,
  getCollegiateBodyService,
  getCollegiateBodyByIdService,
  updateCollegiateBodyService
};
