import express from 'express';
import followController from '../controllers/follow.controllers';
import validations from '../helpers/validations';

const router = express.Router();

router.post(
  '/follow/:followeeId',
  validations.verifyUser,
  followController.followUser
);
router.delete(
  '/follow/:unFolloweeId',
  validations.verifyUser,
  followController.unFollowUser
);

export default router;
