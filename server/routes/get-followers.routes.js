import express from 'express';
import controllers from '../controllers';
import middlewares from '../middlewares';

const { tokenValidator } = middlewares;

const { getFollowersController } = controllers;

const router = express.Router();

/**
 * @swagger
 *
 * /followers:
 *   get:
 *     tags:
 *       - follower
 *     description: User should be able to see his/her followers
 *     produces:
 *       - application/json
 *     parameters:
 *         schema:
 *           $ref: '#/definitions/followers'
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
  '/followers',
  tokenValidator.verifyToken,
  getFollowersController.getFollowers
);

/**
 * @swagger
 *
 * /following:
 *   get:
 *     tags:
 *       - following
 *     description: User should be able to see those his following
 *     produces:
 *       - application/json
 *     parameters:
 *         schema:
 *           $ref: '#/definitions/following'
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
  '/following',
  tokenValidator.verifyToken,
  getFollowersController.getFollowing
);
export default router;
