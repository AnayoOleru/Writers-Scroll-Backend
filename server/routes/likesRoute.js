import express from 'express';
import articleLike from '../controllers/likesControllers';

const router = express.Router();

router.post('/likes/:articleId', articleLike.toggleLike);
export default router;
