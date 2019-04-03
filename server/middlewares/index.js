import signUpValidator from './user.middlewares';
import profileMiddleware from './profile.middlewares';
import ResetPasswordMiddleware from './resetpassword';

export default {
  signUpValidator,
  profileMiddleware,
  ResetPasswordMiddleware,
};
