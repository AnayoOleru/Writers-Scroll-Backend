import express from 'express';
import likeArticle from '../controllers/likesControllers';

const router = express.Router();

router.post('/likes/:articleId', likeArticle.toggleLike);
export default router;
