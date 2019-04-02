import express from 'express';

import getArticles from './get-articles.routes';

const router = express.Router();

router.use(getArticles);

export default router;
