import express from 'express';
import controllers from '../controllers';

const { articleController } = controllers;

const router = express.Router();

router.get('/article/:id', articleController.getOneArticle);

export default router;
