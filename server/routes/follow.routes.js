import express from 'express';
import followController from '../controllers/follow.controllers';
import middlewares from '../middlewares';

const { tokenValidator } = middlewares;

const router = express.Router();

/**
 * @swagger
 *
 * /follow/{followeeId}:
 *   post:
 *     tags:
 *       - follow
 *     description: user should be able to follow each other
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: followeeId
 *         description: id of the person to follow
 *         schema:
 *           $ref: '#/definitions/follow'
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
router.post(
  '/follow/:followeeId',
  tokenValidator.verifyToken,
  followController.followUser
);

/**
 * @swagger
 *
 * /follow/{unFolloweeId}:
 *   post:
 *     tags:
 *       - follow
 *     description: user should be able to unfollow each other
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: followeeId
 *         description: id of the person to unfollow
 *         schema:
 *           $ref: '#/definitions/follow'
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
router.delete(
  '/follow/:unFolloweeId',
  tokenValidator.verifyToken,
  followController.unFollowUser
);

export default router;
