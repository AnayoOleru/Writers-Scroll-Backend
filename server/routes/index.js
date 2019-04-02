import express from 'express';
import articleRoute from './profile.routes';

const router = express.Router();

router.use(articleRoute);

export default router;
