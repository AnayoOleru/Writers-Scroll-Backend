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
          as: 'replies',
          order: ['body'],
          attributes: [
            'id',
            'comment_id',
            'is_reply',
            'reply',
            'updatedAt',
            'createdAt',
          ],
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
