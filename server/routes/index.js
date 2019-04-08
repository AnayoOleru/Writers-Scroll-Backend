import express from 'express';

import getArticles from './get-articles.routes';
import likeRoute from './like.routes';
import resetPasswordRouter from './reset-password.routes';
import profileRoute from './profile.routes';
import articleRoute from './article.routes';
import authRoute from './user.routes';
import ratingRoute from './rating.routes';
import commentRoute from './comment.routes';
import followRoutes from './follow.routes';
import getFollowersRoute from './get-followers.routes';

const router = express.Router();

/**
 * @swagger
 * definition:
 *    default:
 *    users:
 *    profiles:
 *    articles:
 *    tags:
 */
/**
 * @swagger
 *
 * /api/v1/welcome:
 *   get:
 *     description: Default Welcome Message
 *     produces:
 *       - application/json
 *     request:
 *         content:
 *         - application/json
 *         schema:
 *           type: array
 *           items:
 *         $ref: '#/definitions/default'
 *     responses:
 *       200:
 *         description: welcome message
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Authorization information is missing or invalid.
 *       404:
 *        description: A user with the specified ID was not found.
 *       5XX:
 *        description: Unexpected error.
 */

router.use(getArticles);
router.use(followRoutes);
router.use(profileRoute);
router.use(articleRoute);
router.use(ratingRoute);
router.use(commentRoute);
router.use('/auth', authRoute);
router.use(resetPasswordRouter);
router.use(profileRoute);
router.use(likeRoute);
router.use(profileRoute);
router.use(getFollowersRoute);

export default router;
