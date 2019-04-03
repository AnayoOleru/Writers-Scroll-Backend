import model from '../models';

const { Like } = model;

const likeHelper = {
  // Get a user like from like record
  getUserLike(userId, articleId) {
    return Like.findOne({
      where: {
        user_id: userId.id,
        article_id: articleId.id,
      },
    });
  },
  // Remove a like from the like table
  async removeLike(userId, articleId) {
    await Like.destroy({
      where: {
        user_id: userId.id,
        article_id: articleId.id,
      },
    });
    const updatedLike = await articleId.decrement('likes_count');
    return {
      likes_count: updatedLike.likes_count,
      like: false,
    };
  },
  // Create a like  and add it into the like table
  async addLike(userId, articleId) {
    await Like.create({
      user_id: userId.id,
      article_id: articleId.id,
    });
    const updatedlike = await articleId.increment('likes_count');
    return {
      likes_count: updatedlike.likes_count,
      like: true,
    };
  },
};
export default likeHelper;
