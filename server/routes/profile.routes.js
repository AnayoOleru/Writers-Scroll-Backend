import express from 'express';
import controllers from '../controllers';

const { profileController } = controllers;

const router = express.Router();

router.get('/profile/:id', profileController.getUserProfile);
router.get('/profile', profileController.getProfileByField);

export default router;
