import likeController from './like.controllers';
import profileController from './profile.controllers';
import articleController from './article.controllers';
import followController from './follow.controllers';
import authController from './auth.controller';
import ratingController from './rating.controller';
import ResetPasswordController from './reset-password.controllers';
import commentController from './comment.controller';
import getFollowersController from './get-followers.controllers';
import getDailyStatistics from './statistics.controller';
import adminController from './admin.controllers';
import bookmarkController from './bookmark.controller';
import requestController from './user-request.controllers';
import searchArticles from './search-article.controllers';
import getAllReportedArticles from './get-articles.controllers';
import updateIsSeenColumn from './notification.controllers';

export default {
  profileController,
  articleController,
  followController,
  authController,
  likeController,
  ratingController,
  ResetPasswordController,
  commentController,
  getFollowersController,
  getDailyStatistics,
  adminController,
  bookmarkController,
  requestController,
  searchArticles,
  getAllReportedArticles,
  updateIsSeenColumn,
};
