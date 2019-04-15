import express from 'express';
import controller from '../controllers';
import middleware from '../middlewares';

const { tokenValidator, userRequest } = middleware;
const { requestController } = controller;
const router = express.Router();

// User request to become a reviewer
router.post(
  '/request',
  tokenValidator.verifyToken,
  userRequest.verifyRequest,
  requestController.request
);

// User unchecked his/her reviewer request
router.delete(
  '/request',
  tokenValidator.verifyToken,
  userRequest.verifyUncheckRequest,
  requestController.removeRequest
);

export default router;
