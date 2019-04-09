import model from '../models';

const { Bookmark } = model;

const bookmarkHelper = {
  getUserBookmarks(userId, articleId) {
    return Bookmark.findOne({
      where: {
        user_id: userId.id,
        article_id: articleId.id,
      },
    });
  },

  async removeBookmark(userId, articleId) {
    await Bookmark.destroy({
      where: {
        user_id: userId.id,
        article_id: articleId.id,
      },
    });
    const bookmarkedArticle = await articleId.decrement('bookmark_count');
    return {
      bookmark_count: bookmarkedArticle.bookmark_count,
      bookmarked: false,
    };
  },

  async addBookmark(userId, articleId) {
    await Bookmark.create({
      user_id: userId.id,
      article_id: articleId.id,
    });
    const bookmarkedArticle = await articleId.increment('bookmark_count');
    return {
      bookmark_count: bookmarkedArticle.bookmark_count,
      bookmarked: true,
    };
  },
};
export default bookmarkHelper;
