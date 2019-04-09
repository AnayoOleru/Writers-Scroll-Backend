import model from '../models';

const { LikeComment } = model;
// console.log(model, '--------');

const likeHelper = {
  // Get a user like from likeComent table
  getLike(userId, commentId) {
    return LikeComment.findOne({
      where: {
        user_id: userId,
        comment_id: commentId,
      },
    });
  },

  // Remove a like from the likeComment table
  async removeLike(userId, commentId) {
    await LikeComment.destroy({
      where: {
        user_id: userId.id,
        comment_id: commentId.id,
      },
    });

    // decrement like count on the comment table
    const updatedLike = await commentId.decrement('likes_count');
    return {
      likes_count: updatedLike.likes_count,
      like: false,
    };
  },

  // Create a like and add it into the likeComment table
  async addLike(userId, commentId) {
    await LikeComment.create({
      user_id: userId.id,
      comment_id: commentId.id,
    });

    // increment like count on the comment table
    const updatedlike = await commentId.increment('likes_count');
    return {
      likes_count: updatedlike.likes_count,
      like: true,
    };
  },
};
export default likeHelper;
