import express from 'express';
import controllers from '../controllers';
import middleware from '../middlewares';

const { adminController } = controllers;
const { tokenValidator } = middleware;

const router = express.Router();

// Activate a use as a reviewer
router.patch(
  '/admin/:id/upgrade',
  tokenValidator.verifyAdmin,
  adminController.activateReviewer
);

// deactivate a user a reviewer
router.patch(
  '/admin/:id/downgrade',
  tokenValidator.verifyAdmin,
  adminController.deactivateReviewer
);
export default router;
