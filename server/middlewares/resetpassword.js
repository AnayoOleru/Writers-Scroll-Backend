import notification from '../helpers/notifications';
import Authenticate from '../helpers/auth';
import model from '../models';

const { User } = model;

const { decode, encode } = Authenticate;

const ResetPasswordMiddleware = {
  async validateEmail(req, res, next) {
    const userEmail = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!userEmail) {
      return res.status(404).json({
        error: 'Email not found',
      });
    }
    req.user = userEmail;
    return next();
  },

  createToken(req, res, next) {
    const token = encode(req.body.email);
    req.token = token;
    return next();
  },

  async mailer(req, res) {
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
  },

  async validateToken(req, res, next) {
    try {
      req.data = decode(req.params.token);
    } catch (error) {
      if (error) {
        return res.status(406).json({
          status: 406,
          error: 'Oops, something went wrong',
        });
      }
    }
    return next();
  },

  async verifyEmailToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(403).json({
        status: 403,
        error: 'You need to provide a token',
      });
    }

    try {
      const data = await decode(token);
      req.user = data;
    } catch (err) {
      if (err) {
        return res.status(403).json({
          status: 403,
          error: 'user authentication failed',
        });
      }
    }

    return next();
  },
};
export default ResetPasswordMiddleware;
