import model from '../models';

const { Like_comment: LikeComment } = model;

const likeHelper = {
  // Get a user like from like record
  getUserLike(userId, commentId) {
    return LikeComment.findOne({
      where: {
        user_id: userId.id,
        comment_id: commentId.id,
      },
    });
  },
  // Remove a like from the like table
  async removeLike(userId, commentId) {
    await LikeComment.destroy({
      where: {
        user_id: userId.id,
        comment_id: commentId.id,
      },
    });
    const updatedLike = await commentId.decrement('likes_count');
    return {
      likes_count: updatedLike.likes_count,
      like: false,
    };
  },
  // Create a like  and add it into the like table
  async addLike(userId, commentId) {
    await LikeComment.create({
      user_id: userId.id,
      comment_id: commentId.id,
    });
    const updatedlike = await commentId.increment('likes_count');
    return {
      likes_count: updatedlike.likes_count,
      like: true,
    };
  },
};
export default likeHelper;
