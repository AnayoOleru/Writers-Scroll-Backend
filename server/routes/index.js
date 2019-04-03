import express from 'express';
import profileRoute from './profile.routes';
import articleRoute from './article.routes';

const router = express.Router();

router.use(profileRoute);
router.use(articleRoute);

export default router;
