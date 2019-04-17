import express from 'express';

import Articles from '../controllers/get-articles.controllers';

const router = express.Router();

/**
 * @swagger
 *
 * /articles/{page}:
 *   get:
 *     tags:
 *       - article
 *     description: an unauthenticated user can view articles in pages
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: page
 *         description: page number
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 */

router.get('/articles/:page', Articles.getArticles);

export default router;
