import express from 'express';
import controllers from '../controllers';
import middlewares from '../middlewares';

const { updateIsSeenColumn } = controllers;
const { tokenValidator } = middlewares;

const router = express.Router();
/**
 * @swagger
 *
 * /notifications/{articleId}:
 *   patch:
 *     tags:
 *       - notifications
 *       - auth
 *     description: authenticated user can get a specific notification
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: articleId
 *         description: Requires article id
 *         required: true
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
 *         description: Server error
 */
router.get(
  '/notifications/:articleId',
  tokenValidator.verifyToken,
  updateIsSeenColumn.updateIsSeenColumn
);
/**
 * @swagger
 *
 * /notifications:
 *   get:
 *     tags:
 *       - notifications
 *     description: get all notifications the user has not read
 *     produces:
 *       - application/json
 *     parameters:
 *         schema:
 *           $ref: '#/definitions/notifications'
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
  '/notifications',
  tokenValidator.verifyToken,
  updateIsSeenColumn.getAllNotifications
);

export default router;
