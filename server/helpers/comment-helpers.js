const getComment = async (Comment, commentid) => {
  try {
    return await Comment.findOne({
      where: {
        id: commentid,
      },
    });
  } catch (err) {
    return err;
  }
};

const getCommentAndReplies = async (Comment, CommentReply, commentid) => {
  try {
    return await Comment.findAll({
      where: {
        id: commentid,
      },
      attributes: ['id', 'likes_count', 'user_id', 'body', 'createdAt'],
      include: [
        {
          model: CommentReply,
          required: false,
          as: 'replies',
          order: ['body'],
          attributes: ['id', 'user_id', 'comment_id', 'reply', 'createdAt'],
        },
      ],
      order: [['replies', 'createdAt', 'asc']],
    });
  } catch (err) {
    return err;
  }
};

const getCommentAndHistories = async (Comment, CommentHistory, commentid) => {
  try {
    return await Comment.findAll({
      where: {
        id: commentid,
      },
      attributes: ['id', 'likes_count', 'user_id', 'body', 'createdAt'],
      include: [
        {
          model: CommentHistory,
          required: false,
          as: 'histories',
          order: ['body'],
          attributes: ['id', 'comment_id', 'body', 'updatedAt'],
        },
      ],
      order: [['histories', 'updatedAt', 'desc']],
    });
  } catch (err) {
    return err;
  }
};

const commentHelper = {
  getComment,
  getCommentAndReplies,
  getCommentAndHistories,
};
export default commentHelper;
