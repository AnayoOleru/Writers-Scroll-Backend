import express from 'express';

import getArticles from './get-articles.routes';
<<<<<<< HEAD
import likeArticle from './like.route';
=======
import articleLike from './likeRoute';
>>>>>>> 12411da... feat(like-dislkie): Resolving conflicts
import profileRoute from './profile.routes';
import articleRoute from './article.routes';
import authRoute from './user.routes';

const router = express.Router();

router.use(getArticles);

router.use(profileRoute);
router.use(articleRoute);
router.use('/auth', authRoute);
router.use(profileRoute, likeArticle);

export default router;
