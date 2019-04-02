import express from 'express';
import profileRoute from './profile.routes';

const router = express.Router();

router.use(profileRoute);

export default router;
