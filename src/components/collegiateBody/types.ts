import { Request } from 'express';
import { ObjectId } from 'mongoose';

type CollegiateBodyModel = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  _id: ObjectId | string;
  name: string;
  admins: string[];
  created: string;
  updated: string;
};

type CreateCollegiateBodyModel = Omit<CollegiateBodyModel, '_id'>;

type FilterCollegiateBodyModel = {
  name?: CollegiateBodyModel['name'];
  admins?: CollegiateBodyModel['admins'] | { $in: CollegiateBodyModel['admins'] };
  created?: CollegiateBodyModel['created'];
  updated?: CollegiateBodyModel['updated'];
};

interface CreateCollegiateBodyRequest extends Request {
  body: CreateCollegiateBodyModel;
}

interface GetCollegiateBodyFilterRequest extends Request {
  query: FilterCollegiateBodyModel;
}

interface GetCollegiateBodyByIdRequest extends Request {
  params: {
    id: string;
  };
}

interface UpdateCollegiateBodyRequest extends Request {
  params: {
    id: string;
  };
  body: {
    admins: string[];
    updated: string;
  };
}

export {
  CollegiateBodyModel,
  CreateCollegiateBodyModel,
  CreateCollegiateBodyRequest,
  FilterCollegiateBodyModel,
  GetCollegiateBodyFilterRequest,
  GetCollegiateBodyByIdRequest,
  UpdateCollegiateBodyRequest
};
