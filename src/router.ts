import express from 'express';

import { userRouter } from './components/user/routes';
import { collegiateBodyRouter } from './components/collegiateBody/routes';
import { colDirRouter } from './components/collegiateDirectory/routes';
import { documentRouter } from './components/document/routes';
import { authRouter } from './components/auth/routes';

const routers = express.Router();

routers.use('/collegiateBodies', collegiateBodyRouter);
routers.use('/collegiateDirectory', colDirRouter);
routers.use('/document', documentRouter);
routers.use('/users', userRouter);
routers.use('/auth', authRouter);

export { routers };
