import authValidator from './user.middlewares';
import profileMiddleware from './profile.middlewares';
import ResetPasswordMiddleware from './reset-password.middlewares';
import articleMiddleware from './article.middlewares';
import tokenValidator from './verify-token.middlewares';
import ratingMiddleware from './rating.middlewares';
import commentMiddleware from './comment.middlewares';

export default {
  authValidator,
  profileMiddleware,
  ResetPasswordMiddleware,
  articleMiddleware,
  tokenValidator,
  ratingMiddleware,
  commentMiddleware,
};
