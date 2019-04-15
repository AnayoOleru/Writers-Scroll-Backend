import express from 'express';
import passport from 'passport';
import controllers from '../controllers';
import middlewares from '../middlewares';

const { authValidator } = middlewares;
const { authController } = controllers;

const authRoute = express.Router();

/**
 * @swagger
 *
 * /auth/login:
 *   post:
 *     tags:
 *       - auth
 *     description: authenticate a user
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Required user payload
 *         required: true
 *         schema:
 *           $ref: '#/definitions/login'
 *     responses:
 *       201:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Server error
 */
authRoute.post(
  '/login',
  authValidator.loginValidator,
  authController.loginController
);
authRoute.get(
  '/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
);

authRoute.get(
  '/facebook/callback',
  passport.authenticate('facebook', { session: false }),
  authController.socialRedirect
);

authRoute.get('/twitter', passport.authenticate('twitter'));

authRoute.get(
  '/twitter/callback',
  passport.authenticate('twitter', { session: false }),
  authController.socialRedirect
);

authRoute.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

authRoute.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  authController.socialRedirect
);

/**
 * @swagger
 *
 * /auth/signup:
 *   post:
 *     tags:
 *       - auth
 *     description: authenticate a user
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Required user payload
 *         required: true
 *         schema:
 *           $ref: '#/definitions/signup'
 *     responses:
 *       201:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Server error
 */
authRoute.post(
  '/signup',
  authValidator.signUpValidator,
  authController.signupController
);

authRoute.patch('/verification/:token', authController.verifyEmail);

export default authRoute;
