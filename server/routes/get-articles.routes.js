import express from 'express';

import Articles from '../controllers/get-articles.controllers';
import middlewares from '../middlewares';

const { tokenValidator } = middlewares;

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

/**
 * @swagger
 *
 * /reported-articles:
 *   get:
 *     tags:
 *       - article
 *     description: a verified reviewer can get all reported articles
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: status
 *         description: Requires status query string
 *         required: true
 *         schema:
 *           $ref: '#/definitions/article'
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: ran
 */
router.get(
  '/reported-articles',
  tokenValidator.verifyToken,
  tokenValidator.isVerifiedReviewer,
  Articles.getAllReportedArticles
);

export default router;
