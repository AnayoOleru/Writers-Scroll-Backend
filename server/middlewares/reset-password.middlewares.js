import Joi from 'joi';
import notification from '../helpers/notifications';
import Authenticate from '../helpers/auth';
import model from '../models';
import resetPassword from '../joiSchema/confirmPasswordSchema';
import serverError from '../helpers/server-error';

const { resetPasswordSchema } = resetPassword;
const { User } = model;

const { decode, encodeEmail, comparePassword } = Authenticate;

const ResetPasswordMiddleware = {
  async validateEmail(req, res, next) {
    try {
      const { error } = Joi.validate(req.body, resetPasswordSchema.emailSchema);
      if (error) {
        return res.status(400).send({
          errors: {
            body: [error.details[0].message],
          },
        });
      }
      const userEmail = await User.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (!userEmail) {
        return res.status(404).json({
          errors: {
            body: ['Email not found'],
          },
        });
      }
      req.user = userEmail;
      return next();
    } catch (error) {
      return res.status(500).json({
        errors: serverError(),
      });
    }
  },

  createToken(req, res, next) {
    const token = encodeEmail(req.body.email);
    req.token = token;
    return next();
  },

  async mailer(req, res) {
    try {
      // const urlTest = req.body;
      const linkUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/reset/${
        req.token
      }/password`;

      await notification.forgetPassword(req.body.email, linkUrl);

      return res.status(200).json({
        status: 200,
        data: [
          {
            message: 'Check your email for password reset link',
            email: req.body.email,
            token: req.token,
          },
        ],
      });
    } catch (error) {
      return res.status(500).json({
        errors: serverError(),
      });
    }
  },

  async validateToken(req, res, next) {
    try {
      req.data = decode(req.params.token);
    } catch (error) {
      if (error) {
        return res.status(406).json({
          errors: {
            body: ['Oops, something went wrong'],
          },
        });
      }
    }
    return next();
  },

  async verifyEmailToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(403).json({
        errors: {
          body: ['You need to provide a token'],
        },
      });
    }

    try {
      const data = await decode(token);
      req.user = data;
    } catch (err) {
      if (err) {
        return res.status(403).json({
          errors: {
            body: ['user authentication failed'],
          },
        });
      }
    }

    return next();
  },

  async isOldPassword(req, res, next) {
    const userEmail = await User.findOne({
      where: {
        email: req.user.email,
      },
    });

    const oldPass = comparePassword(userEmail.password, req.body.password);

    if (oldPass) {
      return res.status(409).json({
        errors: {
          body: ['You cannot use an old password'],
        },
      });
    }

    return next();
  },

  validatePassword(req, res, next) {
    const { password, confirmPassword } = req.body;

    const { error } = Joi.validate(
      req.body,
      resetPasswordSchema.passwordSchema
    );
    if (error) {
      return res.status(400).send({
        errors: {
          body: [error.details[0].message],
        },
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        errors: {
          body: ['Passwords do not match'],
        },
      });
    }

    return next();
  },
};
export default ResetPasswordMiddleware;
