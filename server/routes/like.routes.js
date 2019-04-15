import express from 'express';
import controllers from '../controllers';
import middlewares from '../middlewares';

const { tokenValidator } = middlewares;
const { likeController } = controllers;

const router = express.Router();

/**
 * @swagger
 *
 * /likes/{articleId}:
 *   post:
 *     tags:
 *       - like article
 *     description: authenticated user can like an article
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: articleId
 *         description: id of the article
 *         required: true
 *       - in: params
 *         name: article_id
 *         description: Article body to like
 *         required: true
 *         schema:
 *           $ref: '#/definitions/like_article'
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
router.post(
  '/likes/:articleId',
  tokenValidator.verifyToken,
  likeController.toggleLike
);
export default router;
