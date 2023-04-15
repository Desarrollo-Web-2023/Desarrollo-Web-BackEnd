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

const updateCollegiateBody = async (
  req: UpdateCollegiateBodyRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedCollegiateBody = await updateCollegiateBodyService(
      req.params.id,
      req.body.admins,
      req.body.updated
    );
    success(res, 200, 'User update successful', updatedCollegiateBody);
  } catch (error) {
    next(error);
  }
};

export { createCollegiateBody, getCollegiateBody, getCollegiateBodyById, updateCollegiateBody };
