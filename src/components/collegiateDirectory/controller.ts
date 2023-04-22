import { NextFunction, Response } from 'express';

import { createColDirService, getColDirByidService, getColDirService } from './service';
import { success } from '../../utils/response';
import {
  ColDirModel,
  CreateColDirRequest,
  FilterColDirRequest,
  GetColDirByIdRequest
} from './types';

const createColDir = async (req: CreateColDirRequest, res: Response, next: NextFunction) => {
  try {
    const createdColDir: ColDirModel = await createColDirService(req.body);
    success(res, 201, 'Collegiate directory created successfully', createdColDir);
  } catch (error) {
    next(error);
  }
};

const getColDir = async (req: FilterColDirRequest, res: Response, next: NextFunction) => {
  try {
    const foundColDir: ColDirModel[] = await getColDirService(req.query);
    success(res, 200, 'Ok', foundColDir);
  } catch (error) {
    next(error);
  }
};

const getColDirById = async (req: GetColDirByIdRequest, res: Response, next: NextFunction) => {
  try {
    const foundColDir: ColDirModel = await getColDirByidService(req.params.id);
    success(res, 200, 'Ok', foundColDir);
  } catch (error) {
    next(error);
  }
};

const updateColDir = async (req: UpdateColDirRequest, res: Response, next: NextFunction) => {
  try {
    const updatedColDir: ColDirModel = await updateColDirService(req.params.id, req.body);
    success(res, 200, 'Collegiate directory updated successfully', updatedColDir);
  } catch (error) {
    next(error);
  }
};

export { createColDir, getColDir, getColDirById };
