import express from 'express';

import Articles from '../controllers/search-article.controllers';

const router = express.Router();

router.use('/search', Articles.searchArticles);

export default router;
