import express from 'express';
import controllers from '../controllers';
import middlewares from '../middlewares';

const { signUpValidator } = middlewares;

const authRoute = express.Router();
const { authController } = controllers;

authRoute.post('/signup', signUpValidator.signUpValidator);
authRoute.post(
  '/login',
  signUpValidator.loginValidator,
  authController.loginController
);
authRoute.post('/signup', signUpValidator.signUpValidator);
authRoute.post('/login', signUpValidator.loginValidator);

export default authRoute;
