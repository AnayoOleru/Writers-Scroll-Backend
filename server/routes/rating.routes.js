import express from 'express';
import controllers from '../controllers';
import middlewares from '../middlewares';

const { tokenValidator, ratingMiddleware } = middlewares;
const { ratingController } = controllers;

const router = express.Router();

/**
 * @swagger
 *
 * /ratings:
 *   post:
 *     tags:
 *       - rating
 *     description: authenticated user can rate an article
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Required Article rating payload
 *         required: true
 *         schema:
 *           $ref: '#/definitions/rating'
 *     responses:
 *       201:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: unauthorized
 *       403:
 *         description: Forbidden
 *       409:
 *         description: Conflict
 *       500:
 *         description: ran
 */

router.post(
  '/ratings',
  tokenValidator.verifyToken,
  ratingMiddleware.validateRating,
  ratingController.post
);

export default router;
