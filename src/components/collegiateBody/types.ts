import { Request } from 'express';

type CollegiateBodyModel = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  _id: string;
  name: string;
  admins: string[];
};

type CreateCollegiateBodyModel = Omit<CollegiateBodyModel, '_id'>;

type FilterCollegiateBodyModel = {
  name?: CollegiateBodyModel['name'];
  admins?: CollegiateBodyModel['admins'] | { $in: CollegiateBodyModel['admins'] };
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
