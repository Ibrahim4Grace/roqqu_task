import { NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entities';
import { TokenService } from '../utils';
import {
  asyncHandler,
  ResourceNotFound,
  ServerError,
  Unauthorized,
  Forbidden,
} from '../middlewares';

const extractToken = (req: Request): string | null => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.split(' ')[1];
};

export const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = extractToken(req);
    if (!token) {
      throw new Unauthorized('No token provided');
    }

    const payload = await TokenService.verifyAuthToken(token);
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({
      where: { id: payload.userId },
    });

    const currentUser = user;
    if (!currentUser) {
      throw new Unauthorized('User not found');
    }

    req.user = {
      user_id: currentUser.id,
      email: currentUser.email,
      role: currentUser.role,
      name: currentUser.name,
    };
    next();
  } catch (error) {
    console.error(error);
    throw new ServerError('INTERNAL_SERVER_ERROR');
  }
};

export const authorization = (roles: string[]) =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.user_id;
    if (!userId) {
      throw new Unauthorized('User not authenticated');
    }

    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({ where: { id: userId } });
    const currentUser = user;
    if (!currentUser) {
      throw new ResourceNotFound('User not found');
    }

    req.currentUser = currentUser;

    if (!roles.includes(currentUser.role)) {
      throw new Forbidden(`Access denied ${currentUser.role} isn't allowed`);
    }

    next();
  });
