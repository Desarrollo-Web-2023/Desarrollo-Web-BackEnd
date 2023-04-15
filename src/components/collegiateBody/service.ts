import Boom from '@hapi/boom';
import {
  findCollegiateBody,
  findCollegiateBodyById,
  saveCollegiateBody,
  updateCollegiateBody
} from './store';
import { CreateCollegiateBodyModel, FilterCollegiateBodyModel, CollegiateBodyModel } from './types';
import { getUserByIdService } from '../user/service';

/**
 * create collegiate body
 * @param newCollegiateBody receive a name and list of admin ids
 * @returns collegiate body created
 */
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

  newCollegiateBody.admins.forEach(async (id) => {
    await getUserByIdService(id);
  });

  const createdCollegiateBody = await saveCollegiateBody(newCollegiateBody);
  return createdCollegiateBody;
};

/**
 * get all collegiate body by filters
 * @param filter by name and list of admin ids
 * @returns list of found collegiate body objects
 */
const getCollegiateBodyService = async (filter?: FilterCollegiateBodyModel) => {
  const collegiateBody = await findCollegiateBody(filter);
  if (!collegiateBody) throw Boom.notFound('Collegiate Body not found');

  return collegiateBody;
};

/**
 * get a collegiate body by id
 * @param id id to find a collegiate body object
 * @returns collegiate body object found
 */
const getCollegiateBodyByIdService = async (id: CollegiateBodyModel['_id']) => {
  const collegiateBody = await findCollegiateBodyById(id);
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
  const updatedCollegiateBody = await updateCollegiateBody(id, admins);
  if (!updatedCollegiateBody) throw Boom.notFound('Collegiate Body not found');

  return updatedCollegiateBody;
};

export {
  createCollegiateBodyService,
  getCollegiateBodyService,
  getCollegiateBodyByIdService,
  updateCollegiateBodyService
};
