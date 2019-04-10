import express from 'express';
import controllers from '../controllers';
import middlewares from '../middlewares';

const { tokenValidator } = middlewares;
const { bookmarkController } = controllers;

const router = express.Router();

router.post(
  '/bookmarks/:articleId',
  tokenValidator.verifyToken,
  bookmarkController.toggleBookmark
);
export default router;
