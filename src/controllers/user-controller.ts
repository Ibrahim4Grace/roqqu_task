import { Request, Response } from 'express';
import { UserService } from '../services';
import {
  sendJsonResponse,
  asyncHandler,
  ResourceNotFound,
} from '../middlewares';

export class UserController {
  private userService = new UserService();

  public fetchUser = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const userId = req.currentUser.id;
      if (!userId) {
        throw new ResourceNotFound('User not found');
      }
      const user = await this.userService.getCurrentUser(userId);
      sendJsonResponse(res, 200, 'Profile retrieved successfully', user);
    }
  );

  public getUsers = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const paginatedResults = res.paginatedResults;

      if (!paginatedResults) {
        throw new ResourceNotFound('Users not found');
      }
      await this.userService.getUser();
      sendJsonResponse(
        res,
        200,
        'Users retrieved successfully',
        paginatedResults
      );
    }
  );

  public updateUser = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const userId = req.params.userId;
      if (!userId) {
        throw new ResourceNotFound('User ID is required');
      }

      const userData = req.body;
      const updatedUser = await this.userService.updateCurrentUser(
        userId,
        userData
      );

      sendJsonResponse(res, 200, 'Profile updated successfully', updatedUser);
    }
  );

  public getUsersCount = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const count = await this.userService.getUsersCount();
      sendJsonResponse(res, 200, 'Users count retrieved successfully', {
        count,
      });
    }
  );

  public createUser = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const userData = req.body;
      const user = await this.userService.createUser(userData);
      sendJsonResponse(res, 201, 'User created successfully', user);
    }
  );
}
