import express from 'express';
import controllers from '../controllers';
import middlewares from '../middlewares';

const { tokenValidator } = middlewares;
const { likeController } = controllers;

const router = express.Router();

router.post(
  '/likes/:articleId',
  tokenValidator.verifyToken,
  likeController.toggleLike
);
export default router;
