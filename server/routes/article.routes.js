import express from 'express';
import controllers from '../controllers';
import middlewares from '../middlewares';

const { articleController } = controllers;
const { articleMiddleware, tokenValidator } = middlewares;

const router = express.Router();

/**
 * @swagger
 *
 * /article/{id}:
 *   get:
 *     tags:
 *       - article
 *     description: authenticated user can get an article
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Requires Article id
 *         required: true
 *         schema:
 *           $ref: '#/definitions/article'
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: ran
 */

router.get(
  '/article/:id',
  tokenValidator.verifyToken,
  articleController.getOneArticle
);

/**
 * @swagger
 *
 * /article:
 *   post:
 *     tags:
 *       - article
 *     description: authenticated user can create an article
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: article_body
 *         description: Article body to post
 *         required: true
 *         schema:
 *           $ref: '#/definitions/article'
 *     responses:
 *       201:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: ran
 */

router.post(
  '/article',
  tokenValidator.verifyToken,
  articleMiddleware.validateArticleBody,
  articleMiddleware.checkDraftStatus,
  articleController.createArticle
);

/**
 * @swagger
 *
 * /article/report/{articleId}:
 *   post:
 *     tags:
 *       - article
 *     description: authenticated user can report an article
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: articleId
 *         description: id of the article
 *         required: true
 *       - in: body
 *         name: article_body
 *         description: Article body to reported
 *         required: true
 *         schema:
 *           $ref: '#/definitions/report'
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: ran
 */

router.post(
  '/article/report/:articleId',
  tokenValidator.verifyToken,
  articleMiddleware.reportArticleValidator,
  articleController.reportArticle
);

/**
 * @swagger
 *
 * /article/review/{articleId}:
 *   post:
 *     tags:
 *       - article
 *     description: reviewers can review reported article
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: articleId
 *         description: id of the article
 *         required: true
 *       - in: body
 *         name: article_body
 *         description: Article body to review
 *         required: true
 *         schema:
 *           $ref: '#/definitions/review'
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Server error
 */

router.patch(
  '/article/review/:articleId',
  tokenValidator.verifyToken,
  articleMiddleware.reviewArticleValidator,
  articleController.reviewArticle
);

/**
 * @swagger
 *
 * /article/status/{articleId}:
 *   post:
 *     tags:
 *       - article
 *     description: admin can change the staus of reported article
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: articleId
 *         description: id of the article
 *         required: true
 *       - in: body
 *         name: article_body
 *         description: Article body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/status'
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Server error
 */
router.patch(
  '/article/status/:articleId',
  tokenValidator.verifyToken,
  articleMiddleware.articleStatusValidator,
  articleController.articleStatus
);

/**
 * @swagger
 *
 * /article/{id}:
 *   patch:
 *     tags:
 *       - article
 *     description: authenticated user can patch an article
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id of an article
 *         required: true
 *       - in: body
 *         name: article_body
 *         description: Article body to patch
 *         required: true
 *         schema:
 *           $ref: '#/definitions/article'
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: ran
 */

router.patch(
  '/article/:id',
  tokenValidator.verifyToken,
  articleMiddleware.validateArticleBody,
  articleMiddleware.checkDraftStatus,
  articleController.editAticle
);

/**
 * @swagger
 *
 * /article/{id}:
 *   delete:
 *     tags:
 *       - article
 *     description: authenticated user can delete an article
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id of an article to be deleted
 *         required: true
 *         schema:
 *           $ref: '#/definitions/article'
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: ran
 */
router.delete(
  '/article/:id',
  tokenValidator.verifyToken,
  articleController.deleteArticle
);

/**
 * @swagger
 *
 * /article/highlight/{articleId}:
 *   post:
 *     tags:
 *       - article
 *     description: authenticated user can highlight and comment on an article
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: articleId
 *         description: id of the article
 *         required: true
 *       - in: body
 *         name: article_body
 *         description: body of highlight article
 *         required: true
 *         schema:
 *           $ref: '#/definitions/highlight'
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Server error
 */

router.post(
  '/article/highlight/:articleId',
  tokenValidator.verifyToken,
  articleMiddleware.validateHighlight,
  articleController.createHighlight
);

/**
 * @swagger
 *
 * /myArticles:
 *   get:
 *     tags:
 *       - myArticles
 *     description: An authenticated user can get his/her articles
 *     produces:
 *       - application/json
 *     parameters:
 *         schema:
 *           $ref: '#/definitions/myArticles'
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: server error
 */
router.get(
  '/myArticles',
  tokenValidator.verifyToken,
  articleController.getUserArticles
);

export default router;
