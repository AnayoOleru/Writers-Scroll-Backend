import express from 'express';

import getArticles from './get-articles.routes';

import profileRoute from './profile.routes';
import articleRoute from './article.routes';
import authRoute from './user.routes';
import followUser from './follow.routes';

const router = express.Router();

router.use(getArticles);
router.use(followUser);
router.use(profileRoute);
router.use(articleRoute);
router.use('/auth', authRoute);

export default router;
