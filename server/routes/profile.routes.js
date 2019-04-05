import express from 'express';
import controllers from '../controllers';
import middlewares from '../middlewares';
import validations from '../helpers/validations';

const { profileController } = controllers;
const { profileMiddleware } = middlewares;

const router = express.Router();

router.get(
  '/profile/:id',
  validations.verifyToken,
  profileController.getUserProfile
);
router.get(
  '/profile',
  validations.verifyToken,
  profileController.getProfileByField
);

router.patch(
  '/profile/:id',
  validations.verifyToken,
  profileMiddleware.validateUpdateProfile,
  profileController.patchProfile
);

export default router;
