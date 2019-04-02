import express from 'express';
import controllers from '../controllers';

const { ratingController } = controllers;

const router = express.Router();

router.post('/rating', ratingController.post);

export default router;
