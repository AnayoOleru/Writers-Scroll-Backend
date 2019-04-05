import express from 'express';

import getArticles from './get-articles.routes';
import likeArticle from './like.route';
import profileRoute from './profile.routes';
import articleRoute from './article.routes';
import authRoute from './user.routes';
// import followUser from './followRoutes';
import ratingRoute from './rating.routes';
import commentRoute from './comment.routes';
import followRoutes from './follow.routes';

const router = express.Router();

router.use(getArticles);
router.use(followRoutes);
router.use(profileRoute);
router.use(articleRoute);
router.use(ratingRoute);
router.use(commentRoute);
router.use('/auth', authRoute);
router.use(profileRoute, likeArticle);

export default router;
