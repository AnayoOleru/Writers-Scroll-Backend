import express from 'express';
import controllers from '../controllers';
import middlewares from '../middlewares';

const { tokenValidator } = middlewares;
const { bookmarkController } = controllers;

const router = express.Router();

/**
 * @swagger
 *
 * /bookmarks/{articleId}:
 *   post:
 *     tags:
 *       - article
 *     description: authenticated user can bookmark an article
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: articleId
 *         description: ID of the article to bookmark
 *         required: true
 *         schema:
 *           $ref: '#/definitions/article'
 *     responses:
 *       201:
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
router.post(
  '/bookmarks/:articleId',
  tokenValidator.verifyToken,
  bookmarkController.toggleBookmark
);
/**
 * @swagger
 *
 * /bookmarks:
 *   get:
 *     tags:
 *       - bookmarked
 *     description: authenticated user can get all their bookmarked article
 *     produces:
 *       - application/json
 *     parameters:
 *         schema:
 *           $ref: '#/definitions/bookmarks'
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
 *         description: server error
 */
router.get(
  '/bookmarks',
  tokenValidator.verifyToken,
  bookmarkController.getBookMarkedArticlesForUser
);
export default router;
