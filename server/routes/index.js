import express from 'express';

import getArticles from './get-articles.routes';
import resetPasswordRouter from './resetpassword.routes';
import profileRoute from './profile.routes';
import articleRoute from './article.routes';
import authRoute from './user.routes';
import ratingRoute from './rating.routes';

const router = express.Router();

router.use(getArticles);

router.use(profileRoute);
router.use(articleRoute);
router.use(ratingRoute);
router.use('/auth', authRoute);
router.use(resetPasswordRouter);

export default router;
