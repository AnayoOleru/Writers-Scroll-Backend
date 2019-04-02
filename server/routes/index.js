import express from 'express';
import profileRoute from './profile.routes';
import articleRoute from './article.routes';
import authRoute from './user.routes';

const router = express.Router();

router.use(profileRoute);
router.use(articleRoute);
router.use('/auth', authRoute);

export default router;
