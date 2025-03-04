import { Router } from 'express';
import { UserController } from '../controllers';
import { AppDataSource } from '../data-source';
import { User } from '../entities';
import { authentication, authorization, validateData } from '../middlewares';
import { paginatedResults } from '../utils';
import validate from '../schemas/user-validation';

const userRoute = Router();
const userController = new UserController();
const userRepo = AppDataSource.getRepository(User);

userRoute.get(
  '/user',
  authentication,
  authorization(['user']),
  userController.fetchUser
);

userRoute.get(
  '/users',
  authentication,
  authorization(['user']),
  paginatedResults(userRepo),
  userController.getUsers
);

userRoute.put(
  '/user/:userId',
  authentication,
  authorization(['user']),
  validateData(validate.updateSchema),
  userController.updateUser
);

userRoute.get(
  '/users/count',
  authentication,
  authorization(['user']),
  userController.getUsersCount
);
userRoute.post(
  '/users',
  authentication,
  authorization(['user']),
  validateData(validate.createSchema),
  userController.createUser
);

export default userRoute;
