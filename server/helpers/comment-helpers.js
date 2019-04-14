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

const getCommentAndReplies = async (Comment, CommentHistory, commentid) => {
  try {
    return await Comment.findAll({
      where: {
        id: commentid,
      },
      include: [
        {
          model: CommentHistory,
          required: false,
          as: 'histories',
          order: ['body'],
          attributes: [
            'id',
            'comment_id',
            'is_reply',
            'reply',
            'updatedAt',
            'createdAt',
          ],
          where: {
            is_reply: true,
          },
        },
      ],
      order: [['histories', 'updatedAt', 'asc']],
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
      include: [
        {
          model: CommentHistory,
          required: false,
          as: 'histories',
          order: ['body'],
          attributes: ['id', 'comment_id', 'body', 'updatedAt', 'createdAt'],
          where: {
            is_updated: true,
          },
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
