import express from 'express';

import getArticles from './get-articles.routes';

import profileRoute from './profile.routes';

const router = express.Router();

router.use(getArticles);

router.use(profileRoute);

export default router;
