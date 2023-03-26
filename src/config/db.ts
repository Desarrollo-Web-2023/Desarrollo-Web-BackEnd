import mongoose from 'mongoose';
import Boom from '@hapi/boom';

import { config } from './config';

const options: mongoose.ConnectOptions = {
  dbName: 'PLANTIME'
};

mongoose.set('strictQuery', false);

mongoose.connect(config.dbUrl, options).catch(() => {
  throw Boom.serverUnavailable('Db connection error');
});
