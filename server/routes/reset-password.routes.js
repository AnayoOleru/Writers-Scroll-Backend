import express from 'express';
import middlewares from '../middlewares';
import controllers from '../controllers';

const { ResetPasswordMiddleware } = middlewares;

const { ResetPasswordController } = controllers;
const resetPasswordRouter = express.Router();

/**
 * @swagger
 *
 * /reset:
 *   post:
 *     tags:
 *       - reset password
 *     description: authenticated can reset their passwords
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: email
 *         description: Requires the users email address
 *         required: true
 *         schema:
 *           $ref: '#/definitions/password-reset'
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: unauthorized
 *       403:
 *         description: Forbidden
 *       406:
 *         description: Not acceptable
 *       500:
 *         description: ran
 */
resetPasswordRouter.post(
  '/reset',
  ResetPasswordMiddleware.validateEmail,
  ResetPasswordMiddleware.createToken,
  ResetPasswordMiddleware.mailer
);

/**
 * @swagger
 *
 * /reset/{token}/password:
 *   get:
 *     tags:
 *       - reset password
 *     description: users can update their password
 *     produces:
 *       - application/json
 *     parameters:
 *        - in: path
 *          name: token
 *          description: token received from the email
 *          required: true
 *          schema:
 *           $ref: '#/definitions/password-reset'
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: ran
 */
resetPasswordRouter.get(
  '/reset/:token/password',
  ResetPasswordMiddleware.validateToken,
  ResetPasswordController.acceptRequest
);

resetPasswordRouter.get('/reset/message', (req, res) => {
  res.send('Thank you for requesting a password reset.');
});

/**
 * @swagger
 *
 * /new_password:
 *   post:
 *     tags:
 *       - update password
 *     description: users can update their password
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Required user payload
 *         required: true
 *         schema:
 *           $ref: '#/definitions/update-password'
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: unauthorized
 *       403:
 *         description: Forbidden
 *       406:
 *         description: Not acceptable
 *       500:
 *         description: ran
 */
resetPasswordRouter.patch(
  '/new-password',
  ResetPasswordMiddleware.validatePassword,
  ResetPasswordMiddleware.verifyEmailToken,
  ResetPasswordMiddleware.isOldPassword,
  ResetPasswordController.updatePassword
);

export default resetPasswordRouter;
