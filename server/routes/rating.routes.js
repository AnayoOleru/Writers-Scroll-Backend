import express from 'express';
import controllers from '../controllers';
import ratingValidation from '../joiSchema/ratingSchema';
import validation from '../helpers/validations';

const { ratingController } = controllers;

const router = express.Router();

router.post(
  '/rating',
  validation.verifyToken,
  ratingValidation,
  ratingController.post
);

export default router;
