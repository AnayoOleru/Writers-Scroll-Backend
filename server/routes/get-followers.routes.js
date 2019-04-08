import express from 'express';
import controllers from '../controllers';
import validations from '../helpers/validations';

const { getFollowersController } = controllers;

const router = express.Router();

// Get all users followers
router.get(
  '/followers',
  validations.verifyToken,
  getFollowersController.getFollowers
);

// Get all users following
router.get(
  '/following',
  validations.verifyToken,
  getFollowersController.getFollowing
);
export default router;
