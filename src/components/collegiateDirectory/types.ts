import { Request } from 'express';

type CompleteColDirModel = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  _id: string;
  collegiateBody: string;
  user: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type ProjectionsColDirModel = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  _id?: 1 | 0;
  collegiateBody?: 1 | 0;
  user?: 1 | 0;
  isActive?: 1 | 0;
  createdAt?: 1 | 0;
  updatedAt?: 1 | 0;
};

type ColDirModel = Omit<CompleteColDirModel, 'createdAt' | 'updatedAt'>;

type CreateColDirModel = {
  collegiateBody: ColDirModel['collegiateBody'];
  user: ColDirModel['user'];
  isActive?: ColDirModel['isActive'];
};

interface CreateColDirRequest extends Request {
  body: Omit<ColDirModel, '_id'>;
}

type FilterColDirModel = {
  collegiateBody?: ColDirModel['collegiateBody'];
  user?: ColDirModel['user'];
  isActive?: ColDirModel['isActive'] | 'true' | 'false';
};

interface FilterColDirRequest extends Request {
  query: {
    collegiateBody?: ColDirModel['collegiateBody'];
    user?: ColDirModel['user'];
    isActive?: 'true' | 'false';
  };
}

interface GetColDirByIdRequest extends Request {
  params: {
    id: ColDirModel['_id'];
  };
}

interface UpdateColDirRequest extends Request {
  params: {
    id: ColDirModel['_id'];
  };
  body: {
    isActive: ColDirModel['isActive'];
  };
}

export {
  CompleteColDirModel,
  ColDirModel,
  CreateColDirModel,
  CreateColDirRequest,
  FilterColDirModel,
  FilterColDirRequest,
  ProjectionsColDirModel,
  GetColDirByIdRequest,
  UpdateColDirRequest
};
