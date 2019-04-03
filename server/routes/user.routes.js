import express from 'express';
import controllers from '../controllers';
import middlewares from '../middlewares';

const { signUpValidator } = middlewares;

const { authController } = controllers;
const authRoute = express.Router();

authRoute.post('/signup', signUpValidator.signUpValidator);
authRoute.post(
  '/login',
  signUpValidator.loginValidator,
  authController.loginController
);
authRoute.post('/signup', signUpValidator.signUpValidator);
authRoute.post('/login', signUpValidator.loginValidator);

authRoute.post(
  '/signup',
  middlewares.signUpValidator,
  authController.signupController
);

export default authRoute;
