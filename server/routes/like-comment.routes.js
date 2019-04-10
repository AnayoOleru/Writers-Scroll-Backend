import express from 'express';
import controllers from '../controllers';
import middlewares from '../middlewares';

const { tokenValidator } = middlewares;
const { commentController } = controllers;

const router = express.Router();

/**
 * @swagger
 *
 * /likeComment/{commentId}:
 *   post:
 *     tags:
 *       - comment
 *     description: authenticated user can like a specific comment on an article
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: commentId
 *         description: ID of the comment to like
 *         required: true
 *         schema:
 *           $ref: '#/definitions/comment'
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
  '/likeComment/:commentId',
  tokenValidator.verifyToken,
  commentController.toggleLike
);
export default router;
