import express from 'express';

import { customerRouter } from './components/customer/routes';

const routers = express.Router();

// TODO: CHECK API KEY
routers.use('/customer', customerRouter);

export { routers };
