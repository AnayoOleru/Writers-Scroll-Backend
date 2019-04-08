import express from 'express';
import controllers from '../controllers';
import middlewares from '../middlewares';

const { tokenValidator } = middlewares;

const { getFollowersController } = controllers;

const router = express.Router();

// Get all users followers
router.get(
  '/followers',
  tokenValidator.verifyToken,
  getFollowersController.getFollowers
);

// Get all users following
router.get(
  '/following',
  tokenValidator.verifyToken,
  getFollowersController.getFollowing
);
export default router;
