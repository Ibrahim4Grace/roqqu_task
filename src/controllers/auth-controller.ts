import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services';
import { sendJsonResponse, asyncHandler } from '../middlewares';

const authService = new AuthService();

export const register = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.register(req.body);
  sendJsonResponse(res, 201, 'Registration successful.', result);
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.login(req.body);
  sendJsonResponse(res, 200, 'Login successful', result);
});
