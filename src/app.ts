import express from 'express';
import cors from 'cors';

import { routers } from './router';
import {
  errorHandler,
  logErrors,
  boomErrorHandler,
  mongoErrorHandler
} from './middlewares/error.handler';

import morgan from 'morgan';

require('./config/db');

const createApp = () => {
  const app = express();

  app.use(cors());
  app.use(morgan('tiny'));

  app.use(express.json());

  // ROUTES
  app.use('/api/v1', routers);

  // ERROR MIDDLEWARE
  app.use(logErrors);
  app.use(boomErrorHandler);
  app.use(mongoErrorHandler);
  app.use(errorHandler);

  return app;
};

export { createApp };
