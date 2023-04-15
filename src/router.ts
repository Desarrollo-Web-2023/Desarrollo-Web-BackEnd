import express from 'express';

import { userRouter } from './components/user/routes';
import { collegiateBodyRouter } from './components/collegiateBody/routes';

const routers = express.Router();

// TODO: CHECK API KEY
routers.use('/users', userRouter);
routers.use('/collegiateBodies', collegiateBodyRouter);

export { routers };
