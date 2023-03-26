import { Payload } from '@hapi/boom';
import { Response } from 'express';

const success = (res: Response, status: number, message: string, data: object | undefined) => {
  res.status(status).json({
    error: false,
    message,
    data
  });
};

const failure = (
  res: Response,
  status: number,
  message: string | Payload,
  data: object | string | undefined
) => {
  res.status(status).json({
    error: true,
    message,
    data
  });
};

export { success, failure };
