import express from 'express';

import controllers from '../controllers';
import commentValidation from '../joiSchema/commentSchema';
import validation from '../helpers/validations';

const { commentController } = controllers;

const router = express.Router();

router.post(
  '/comment',
  validation.verifyToken,
  commentValidation,
  commentController.post
);

export default router;
