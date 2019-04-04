import express from 'express';

import controllers from '../controllers';
import commentValidation from '../joiSchema/commentSchema';

const { commentController } = controllers;

const router = express.Router();

router.post('/comment', commentValidation, commentController.post);

export default router;
