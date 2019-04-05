import express from 'express';

import getArticles from './get-articles.routes';
import resetPasswordRouter from './resetpassword.routes';
import likeArticle from './like.route';
import profileRoute from './profile.routes';
import articleRoute from './article.routes';
import authRoute from './user.routes';
import ratingRoute from './rating.routes';
import commentRoute from './comment.routes';

const router = express.Router();

router.use(getArticles);

router.use(profileRoute);
router.use(articleRoute);
router.use(ratingRoute);
router.use(commentRoute);
router.use('/auth', authRoute);
router.use(resetPasswordRouter);
router.use(profileRoute, likeArticle);

export default router;
