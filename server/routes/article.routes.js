import express from 'express';
import controllers from '../controllers';
import middlewares from '../middlewares';

const { articleController } = controllers;
const { articleMiddleware, tokenValidator } = middlewares;

const router = express.Router();

router.get(
  '/article/:id',
  tokenValidator.verifyToken,
  articleController.getOneArticle
);

router.post(
  '/article',
  tokenValidator.verifyToken,
  articleMiddleware.validateArticleBody,
  articleMiddleware.checkDraftStatus,
  articleController.createArticle
);

router.delete(
  '/article/:id',
  tokenValidator.verifyToken,
  articleController.deleteArticle
);

export default router;
