import authValidator from './user.middlewares';
import profileMiddleware from './profile.middlewares';
import ResetPasswordMiddleware from './resetpassword';
import articleMiddleware from './article.middlewares';

export default {
  authValidator,
  profileMiddleware,
  ResetPasswordMiddleware,
  articleMiddleware,
};
