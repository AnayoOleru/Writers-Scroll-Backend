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

router.post(
  '/article/report/:articleId',
  tokenValidator.verifyToken,
  articleMiddleware.reportArticleValidator,
  articleController.reportArticle
);

router.patch(
  '/article/:id',
  tokenValidator.verifyToken,
  articleMiddleware.validateArticleBody,
  articleMiddleware.checkDraftStatus,
  articleController.editAticle
);

router.delete(
  '/article/:id',
  tokenValidator.verifyToken,
  articleController.deleteArticle
);

router.post(
  '/article/highlight/:articleId',
  tokenValidator.verifyToken,
  articleMiddleware.validateHighlight,
  articleController.createHighlight
);

export default router;
