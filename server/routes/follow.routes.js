import express from 'express';
import followUnfollowUser from '../controllers/follows.controllers';

const router = express.Router();

router.post('/follow/:userId', followUnfollowUser.followUser);

export default router;
