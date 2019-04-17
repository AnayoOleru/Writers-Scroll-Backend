import express from 'express';
import controllers from '../controllers';
import middlewares from '../middlewares';

const { profileController } = controllers;
const { profileMiddleware, tokenValidator } = middlewares;

const router = express.Router();

/**
 * @swagger
 *
 * /profile/{id}:
 *   get:
 *     tags:
 *       - profile
 *     description: authenticated user can get a profile
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Requires User id
 *         required: true
 *         schema:
 *           $ref: '#/definitions/profile'
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
  '/profile/:id',
  tokenValidator.verifyToken,
  profileController.getUserProfile
);

/**
 * @swagger
 *
 * /profile:
 *   get:
 *     tags:
 *       - profile
 *     description: authenticated user can get a profile
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: query_string
 *         description: Requires any query string
 *         required: true
 *         schema:
 *           $ref: '#/definitions/profile'
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
  '/profile',
  tokenValidator.verifyToken,
  profileController.getProfileByField
);

/**
 * @swagger
 *
 * /profile/{id}:
 *   patch:
 *     tags:
 *       - profile
 *     description: authenticated user can patch a profile
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: patchable_body
 *         description: patchable body to patch
 *         required: true
 *         schema:
 *           $ref: '#/definitions/profile'
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
  '/profile/:id',
  tokenValidator.verifyToken,
  profileMiddleware.validateUpdateProfile,
  profileController.patchProfile
);

router.get(
  '/suggested/researchers',
  tokenValidator.verifyToken,
  profileMiddleware.getAuthorOfArticleUserLiked,
  profileMiddleware.getAuthorOfArticleUserBookmarked,
  profileMiddleware.getAuthorOfArticleUserCommented,
  profileMiddleware.getAuthorOfUserStatistics,
  profileController.suggestedResearchers
);

export default router;
