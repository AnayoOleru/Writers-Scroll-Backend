import express from 'express';
import middlewares from '../middlewares';
import controllers from '../controllers';

const { profileMiddleware } = middlewares;
const { profileController } = controllers;

const router = express.Router();

router.get(
  '/profile/:id',
  profileMiddleware.checkIfUserExist,
  profileController.getUserProfile
);

export default router;
