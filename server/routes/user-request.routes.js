import express from 'express';
import controller from '../controllers';
import middleware from '../middlewares';

const { tokenValidator, userRequest } = middleware;
const { requestController } = controller;
const router = express.Router();

/**
 * @swagger
 *
 * /request:
 *   post:
 *     tags:
 *       - request
 *     description: authenticated user can make a request to become a reviewer
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Required user payload
 *         required: true
 *         schema:
 *           $ref: '#/definitions/request'
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
// User request to become a reviewer
router.post(
  '/request',
  tokenValidator.verifyToken,
  userRequest.verifyRequest,
  userRequest.checkIfRequestExists,
  requestController.request
);

/**
 * @swagger
 *
 * /request:
 *   delete:
 *     tags:
 *       - request
 *     description: authenticated user can remove his/her request from being a reviewer
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Required user payload
 *         required: true
 *         schema:
 *           $ref: '#/definitions/request'
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
// User unchecked his/her reviewer request
router.delete(
  '/request',
  tokenValidator.verifyToken,
  userRequest.verifyUncheckRequest,
  requestController.removeRequest
);

export default router;
