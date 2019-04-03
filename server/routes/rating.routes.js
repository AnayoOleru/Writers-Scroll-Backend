import express from 'express';
import controllers from '../controllers';
import ratingValidation from '../schema/ratingSchema';

const { ratingController } = controllers;

const router = express.Router();

router.post('/rating', ratingValidation, ratingController.post);

export default router;
