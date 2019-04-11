import authValidator from './user.middlewares';
import profileMiddleware from './profile.middlewares';
import ResetPasswordMiddleware from './reset-password.middlewares';
import articleMiddleware from './article.middlewares';
import tokenValidator from './verify-token.middlewares';
import ratingMiddleware from './rating.middlewares';
import commentMiddleware from './comment.middlewares';
import adminMiddleware from './admin.middlewares';
import uuidMiddleware from './uuid.middleware';
import userIdMiddleware from './user-id-is-correct.middleware';

export default {
  authValidator,
  profileMiddleware,
  ResetPasswordMiddleware,
  articleMiddleware,
  tokenValidator,
  ratingMiddleware,
  commentMiddleware,
  adminMiddleware,
  uuidMiddleware,
  userIdMiddleware,
};
