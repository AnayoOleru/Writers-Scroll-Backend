import express from 'express';

import getArticles from './get-articles.routes';
import resetPasswordRouter from './resetpassword';
import profileRoute from './profile.routes';
import articleRoute from './article.routes';
import authRoute from './user.routes';

const router = express.Router();

router.use(getArticles);

router.use(profileRoute);
router.use(articleRoute);
router.use('/auth', authRoute);
router.use(resetPasswordRouter);

export default router;
