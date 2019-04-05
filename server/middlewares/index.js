import authValidator from './user.middlewares';
import profileMiddleware from './profile.middlewares';
import ResetPasswordMiddleware from './resetpassword';

export default {
  authValidator,
  profileMiddleware,
  ResetPasswordMiddleware,
};
