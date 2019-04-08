import express from 'express';
import controllers from '../controllers';
import validations from '../helpers/validations';

const { likeController } = controllers;

const router = express.Router();

router.post(
  '/likes/:articleId',
  validations.verifyToken,
  likeController.toggleLike
);
export default router;
