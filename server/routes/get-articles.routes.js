import express from 'express';

import Articles from '../controllers/get-articles.controllers';

const router = express.Router();

router.use('/articles/:page', Articles.getArticles);

export default router;
