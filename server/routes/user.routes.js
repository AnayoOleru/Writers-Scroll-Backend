import express from 'express';
import controllers from '../controllers';
import Middleware from '../middlewares';

const authRoute = express.Router();
const { authController } = controllers;

authRoute.post('/signup', Middleware.signUpValidator);
authRoute.post(
  '/login',
  authController.loginController,
  Middleware.loginValidator
);

export default authRoute;
