import express from 'express';

import Articles from '../controllers/search-article.controllers';

const router = express.Router();
/**
 * @swagger
 *
 * /search?filter=a:
 *   get:
 *     tags:
 *       - search
 *     description: search application for articles, authors and/or keywords
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 */
router.use('/search', Articles.searchArticles);

export default router;
