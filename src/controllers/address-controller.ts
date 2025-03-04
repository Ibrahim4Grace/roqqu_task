import { Request, Response } from 'express';
import {
  asyncHandler,
  sendJsonResponse,
  ResourceNotFound,
} from '../middlewares';
import { AddressService } from '../services';

export class AddressController {
  private addressService: AddressService;

  constructor() {
    this.addressService = new AddressService();
  }

  public getAddress = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const userId = req.currentUser.id;
      if (!userId) {
        throw new ResourceNotFound('User not found');
      }
      const address = await this.addressService.getAddress(userId);
      sendJsonResponse(res, 200, 'Address retrieved successfully', address);
    }
  );

  public createAddress = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const userId = req.currentUser.id;
      if (!userId) {
        throw new ResourceNotFound('User not found');
      }
      const addressData = req.body;
      const address = await this.addressService.createAddress(
        userId,
        addressData
      );
      sendJsonResponse(res, 201, 'Address created successfully', address);
    }
  );

  public updateAddress = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const userId = req.params.userId;
      const addressData = req.body;
      const address = await this.addressService.updateAddress(
        userId,
        addressData
      );
      sendJsonResponse(res, 200, 'Address updated successfully', address);
    }
  );
}
