import express from 'express';
import controllers from '../controllers';
import middleware from '../middlewares';

const { adminController } = controllers;
const { tokenValidator, adminMiddleware } = middleware;

const router = express.Router();

// Activate a use as a reviewer
router.patch(
  '/admin/:id/upgrade',
  tokenValidator.verifyToken,
  tokenValidator.verifyAdmin,
  adminMiddleware.checkAdmin,
  adminController.activateReviewer
);

// deactivate a user a reviewer
router.patch(
  '/admin/:id/downgrade',
  tokenValidator.verifyToken,
  tokenValidator.verifyAdmin,
  adminMiddleware.checkAdmin,
  adminController.deactivateReviewer
);

// get all reviewer request
router.get(
  '/admin/reviewer',
  tokenValidator.verifyToken,
  tokenValidator.verifyAdmin,
  adminMiddleware.checkAdmin,
  adminController.getAllReviewerRequest
);
export default router;
