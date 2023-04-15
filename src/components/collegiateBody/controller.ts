import { NextFunction, Response } from 'express';
import {
  createCollegiateBodyService,
  getCollegiateBodyByIdService,
  getCollegiateBodyService,
  updateCollegiateBodyService
} from './service';
import { success } from '../../utils/response';
import {
  CreateCollegiateBodyRequest,
  GetCollegiateBodyByIdRequest,
  GetCollegiateBodyFilterRequest,
  UpdateCollegiateBodyRequest
} from './types';

/**
 * create a collegiate body
 * @param req.body information of collegiate body to be created
 */
const createCollegiateBody = async (
  req: CreateCollegiateBodyRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const createdCollegiateBody = await createCollegiateBodyService(body);
    success(res, 201, 'Collegiate Body created successfully', createdCollegiateBody);
  } catch (error) {
    next(error);
  }
};

/**
 *  get list of collegiate body
 * @param req.query filters by name and list of admin ids
 */
const getCollegiateBody = async (
  req: GetCollegiateBodyFilterRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const collegiateBody = await getCollegiateBodyService(req.query);
    success(res, 200, 'Ok', collegiateBody);
  } catch (error) {
    next(error);
  }
};

/**
 * get a specific collegiate body by id
 * @param req.params.id id of collegiate body to be found
 */
const getCollegiateBodyById = async (
  req: GetCollegiateBodyByIdRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const collegiateBody = await getCollegiateBodyByIdService(req.params.id);
    success(res, 200, 'Ok', collegiateBody);
  } catch (error) {
    next(error);
  }
};

/**
 * update a specific collegiate body
 * @param req.params.id id of collegiate body to be updated
 * @param req.body.admins list of admin ids of collegiate body
 */
const updateCollegiateBody = async (
  req: UpdateCollegiateBodyRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedCollegiateBody = await updateCollegiateBodyService(req.params.id, req.body.admins);
    success(res, 200, 'User update successful', updatedCollegiateBody);
  } catch (error) {
    next(error);
  }
};

export { createCollegiateBody, getCollegiateBody, getCollegiateBodyById, updateCollegiateBody };
