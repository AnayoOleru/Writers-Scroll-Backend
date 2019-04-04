import express from 'express';
import controllers from '../controllers';
import middlewares from '../middlewares';

const { profileController } = controllers;
const { profileMiddleware } = middlewares;

const router = express.Router();

router.get('/profile/:id', profileController.getUserProfile);
router.get('/profile', profileController.getProfileByField);

router.patch(
  '/profile/:id',
  profileMiddleware.validateUpdateProfile,
  profileController.patchProfile
);

export default router;
