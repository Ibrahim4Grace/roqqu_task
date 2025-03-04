import { Router } from 'express';
import { AddressController } from '../controllers';
import validate from '../schemas/user-validation';
import { authentication, authorization, validateData } from '../middlewares';

const addressRoute = Router();
const addressController = new AddressController();

addressRoute.get(
  '/',
  authentication,
  authorization(['user']),
  addressController.getAddress
);
addressRoute.post(
  '/',
  authentication,
  authorization(['user']),
  validateData(validate.addressSchema),
  addressController.createAddress
);
addressRoute.patch(
  '/:userId',
  authentication,
  authorization(['user']),
  validateData(validate.addressSchema),
  addressController.updateAddress
);

export default addressRoute;
