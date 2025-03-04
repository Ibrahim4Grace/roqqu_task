import express from 'express';
const router = express.Router();

import authRoute from './auth-route';
import userRoute from './user-route';
import addressRoute from './address-route';
import postRoute from './post-route';

router.use('/auth/user', authRoute);
router.use('/', userRoute);
router.use('/address', addressRoute);
router.use('/posts', postRoute);
export { router };
