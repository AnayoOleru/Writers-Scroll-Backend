import express from 'express';
import controllers from '../controllers';
import middlewares from '../middlewares';
import validations from '../helpers/validations';

const { articleController } = controllers;
const { articleMiddleware } = middlewares;

const router = express.Router();

router.get(
  '/article/:id',
  validations.verifyToken,
  articleController.getOneArticle
);

router.post(
  '/article',
  validations.verifyToken,
  articleMiddleware.validateArticleBody,
  articleMiddleware.checkDraftStatus,
  articleController.createArticle
);

router.delete('/article/:id', articleController.deleteArticle);

export default router;
