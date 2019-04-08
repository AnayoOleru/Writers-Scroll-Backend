import express from 'express';
import controllers from '../controllers';
import ratingValidation from '../joiSchema/ratingSchema';
import validation from '../helpers/validations';

const { ratingController } = controllers;

const router = express.Router();

/**
 * @swagger
 *
 * /rating:
 *   post:
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
  '/rating',
  validation.verifyToken,
  ratingValidation,
  ratingController.post
);

export default router;
