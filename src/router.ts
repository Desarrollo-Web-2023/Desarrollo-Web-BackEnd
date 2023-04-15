import express from 'express';

import { userRouter } from './components/user/routes';

const routers = express.Router();

// TODO: CHECK API KEY
routers.use('/users', userRouter);

export { routers };
