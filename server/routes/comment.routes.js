import express from 'express';
import controllers from '../controllers';
import middlewares from '../middlewares';

const { tokenValidator, commentMiddleware } = middlewares;
const { commentController } = controllers;

const router = express.Router();

/**
 * @swagger
 *
 * /comments:
 *   post:
 *     tags:
 *       - comment
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
 *         description: Server error
 */

router.post(
  '/comments',
  tokenValidator.verifyToken,
  commentMiddleware.validatePostComment,
  commentController.post
);

/**
 * @swagger
 *
 *  /comments/{commentid}/histories:
 *   get:
 *     tags:
 *       - comment
 *     description: get all comments and it's lists of edited histories
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: commentid
 *         description: Requires comment id
 *         required: true
 *         schema:
 *           $ref: '#/definitions/comment'
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
  '/comments/:commentid/histories',
  tokenValidator.verifyToken,
  commentMiddleware.verifyComment,
  commentController.getCommentAndHistories
);

/**
 * @swagger
 *
 *  /comments/{commentid}/replies:
 *   get:
 *     tags:
 *       - comment
 *     description: get all comments and respective replies to each comment
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: commentid
 *         description: Requires comment id
 *         required: true
 *         schema:
 *           $ref: '#/definitions/comment'
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
  '/comments/:commentid/replies',
  tokenValidator.verifyToken,
  commentMiddleware.verifyComment,
  commentController.getCommentAndReplies
);

/**
 * @swagger
 *
 *  /comments/{commentid}:
 *   patch:
 *     tags:
 *       - comment
 *     description: update's comment
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: commentid
 *         description: Requires comment id
 *         required: true
 *         schema:
 *           $ref: '#/definitions/comment'
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
router.patch(
  '/comments/:commentid',
  tokenValidator.verifyToken,
  commentMiddleware.validateEditComment,
  commentMiddleware.verifyComment,
  commentController.updateComment
);

/**
 * @swagger
 *
 *  /comments/{commentid}/replies:
 *   post:
 *     tags:
 *       - comment
 *     description: reply to a specific comment
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: commentid
 *         description: Requires comment id
 *         required: true
 *       - in: body
 *         name: reply
 *         description: reply a comment
 *         required: true
 *         schema:
 *           $ref: '#/definitions/reply-comment'
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
  '/comments/:commentid/replies',
  tokenValidator.verifyToken,
  commentMiddleware.validateReplyComment,
  commentMiddleware.verifyComment,
  commentController.replyComment
);

/**
 * @swagger
 *
 *  /comments/{commentid}:
 *   delete:
 *     tags:
 *       - comment
 *     description: deletes a comment and all it's history
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: commentid
 *         description: Requires comment id
 *         required: true
 *         schema:
 *           $ref: '#/definitions/comment'
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
router.delete(
  '/comments/:commentid',
  tokenValidator.verifyToken,
  commentMiddleware.verifyComment,
  commentController.deleteComment
);

export default router;
