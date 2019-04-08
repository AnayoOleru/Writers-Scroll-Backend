import express from 'express';
import controllers from '../controllers';
import middlewares from '../middlewares';

const { profileController } = controllers;
const { profileMiddleware, tokenValidator } = middlewares;

const router = express.Router();

router.get(
  '/profile/:id',
  tokenValidator.verifyToken,
  profileController.getUserProfile
);
router.get(
  '/profile',
  tokenValidator.verifyToken,
  profileController.getProfileByField
);

router.patch(
  '/profile/:id',
  tokenValidator.verifyToken,
  profileMiddleware.validateUpdateProfile,
  profileController.patchProfile
);

export default router;
