import express from 'express';
import followUnfollowUser from '../controllers/followControllers';

const router = express.Router();

router.post('/profiles/follow', followUnfollowUser.followUser);

export default router;
