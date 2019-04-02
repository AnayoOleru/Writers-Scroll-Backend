import express from 'express';
import Middleware from '../middlewares';

const authRoute = express.Router();

authRoute.post('/signup', Middleware.signUpValidator);
authRoute.post('/login', Middleware.loginValidator);

export default authRoute;
