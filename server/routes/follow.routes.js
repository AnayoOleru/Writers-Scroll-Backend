import express from 'express';
import followController from '../controllers/follow.controllers';
import middlewares from '../middlewares';

const { tokenValidator } = middlewares;

const router = express.Router();

router.post(
  '/follow/:followeeId',
  tokenValidator.verifyToken,
  followController.followUser
);
router.delete(
  '/follow/:unFolloweeId',
  tokenValidator.verifyToken,
  followController.unFollowUser
);

export default router;
