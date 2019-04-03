import express from 'express';
import controllers from '../controllers';
import middlewares from '../middlewares';

const { signUpValidator: auth } = middlewares;

const authRoute = express.Router();
const { authController } = controllers;

authRoute.post('/signup', auth.signUpValidator);
authRoute.post('/login', auth.loginValidator, authController.loginController);

export default authRoute;
