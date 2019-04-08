import express from 'express';
import controllers from '../controllers';
import middlewares from '../middlewares';

const { tokenValidator, commentMiddleware } = middlewares;
const { commentController } = controllers;

const router = express.Router();

/**
 * @swagger
 *
 * /comment:
 *   post:
 *     description: authenticated user can comment on an article
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Required Article comment payload
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
  '/comment',
  tokenValidator.verifyToken,
  commentMiddleware.validateComment,
  commentController.post
);

export default router;
