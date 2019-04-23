import express from 'express';
import controllers from '../controllers';
import middleware from '../middlewares';

const { adminController } = controllers;
const { tokenValidator, adminMiddleware } = middleware;

const router = express.Router();

/**
 * @swagger
 *
 * /admin/{id}/upgrades:
 *   patch:
 *     tags:
 *       - admin
 *       - auth
 *     description: Admin can upgrade a user to become a reviewer
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Requires user id
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

// Activate a use as a reviewer
router.patch(
  '/admin/:id/upgrades',
  tokenValidator.verifyToken,
  tokenValidator.verifyAdmin,
  adminMiddleware.checkAdmin,
  adminController.activateReviewer
);

/**
 * @swagger
 *
 * /admin/{id}/downgrades:
 *   patch:
 *     tags:
 *       - admin
 *       - auth
 *     description: Admin can deactiviate user from  becoming a reviewer
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Requires user id
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
// deactivate a user a reviewer
router.patch(
  '/admin/:id/downgrades',
  tokenValidator.verifyToken,
  tokenValidator.verifyAdmin,
  adminMiddleware.checkAdmin,
  adminController.deactivateReviewer
);

/**
 * @swagger
 *
 * /admin/reviewer:
 *   get:
 *     tags:
 *       - admin
 *       - auth
 *     description: Admin can get all users that requested to be a reviewer
 *     produces:
 *       - application/json
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
// get all reviewer request
router.get(
  '/admin/reviewer',
  tokenValidator.verifyToken,
  tokenValidator.verifyAdmin,
  adminMiddleware.checkAdmin,
  adminController.getAllReviewerRequests
);

/**
 * @swagger
 *
 * /admin/reviewers:
 *   get:
 *     tags:
 *       - admin
 *       - auth
 *     description: Admin can get all reviewers
 *     produces:
 *       - application/json
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
// get all reviewer request
// get all reviewers
router.get(
  '/admin/reviewers',
  tokenValidator.verifyToken,
  tokenValidator.verifyAdmin,
  adminMiddleware.checkAdmin,
  adminController.getAllReviewers
);
export default router;
