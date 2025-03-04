import { Router } from 'express';
import * as authCtlr from '../controllers';
import { validateData } from '../middlewares';
import validate from '../schemas/auth-validation';

const authRoute = Router();

authRoute.post(
  '/register',
  validateData(validate.registerSchema),
  authCtlr.register
);
authRoute.post('/login', validateData(validate.loginSchema), authCtlr.login);

export default authRoute;
