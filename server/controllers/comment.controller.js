import search from '../helpers/search-database';
import model from '../models';
import validations from '../helpers/validations';
import likeHelper from '../helpers/like-comment-helpers';
import serverError from '../helpers/server-error';

const { User, Comment, Comment_history: CommentHistory } = model;
const { databaseError, findArticle } = search;

const getCommentAndReplies = async (req, res) => {
  if (!validations.verifyUUID(req.params.commentid)) {
    return res.status(400).json({
      errors: {
        body: ['id not valid'],
      },
    });
  }

  const comment = await Comment.findOne({
    where: {
      id: req.params.commentid,
    },
  });

  if (!comment) {
    return res.status(404).json({
      errors: {
        body: ['This comment does not exist'],
      },
    });
  }
  const commentReplies = await Comment.findAll({
    where: {
      id: req.params.commentid,
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

  return res.status(200).json({
    commentResponse: commentReplies,
  });
};

const getCommentAndHistories = async (req, res) => {
  if (!validations.verifyUUID(req.params.commentid)) {
    return res.status(400).json({
      errors: {
        body: ['id not valid'],
      },
    });
  }

  const comment = await Comment.findOne({
    where: {
      id: req.params.commentid,
    },
  });

  if (!comment) {
    return res.status(404).json({
      errors: {
        body: ['This comment does not exist'],
      },
    });
  }
  const editHistory = await Comment.findAll({
    where: {
      id: req.params.commentid,
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

  return res.status(200).json({
    comment: editHistory,
  });
};

const post = async (req, res) => {
  const userId = req.user.userObj.id;
  /**
   * @description post comment on article
   * @param {*} req
   * @param {*} res
   * @returns {object} response from database
   */

  try {
    const article = await findArticle(req.body.article_id);
    if (!article) {
      return res.status(404).json({
        errors: {
          body: ['Article does not exist'],
        },
      });
    }
    const comment = await Comment.create({
      user_id: userId,
      article_id: req.body.article_id,
      body: req.body.body,
    });
    res.status(201).json({
      comment,
    });
  } catch (err) {
    databaseError(err, res);
  }
};

const toggleLike = async (req, res) => {
  const token = validations.verifyAuthHeader(req);
  const { id: userId } = token.userObj;
  const { commentId } = req.params;
  try {
    // validate commentId and user Id
    if (!validations.verifyUUID(commentId) || !validations.verifyUUID(userId)) {
      return res.status(400).json({
        errors: {
          body: ['id not valid'],
        },
      });
    }

    // Find a comment by Id
    const comment = await Comment.findOne({
      where: {
        id: commentId,
      },
    });
    if (!comment) {
      return res.status(404).json({
        errors: {
          body: ['comment id does not exist'],
        },
      });
    }

    req.comment = comment;

    const user = await User.findOne({
      where: {
        id: userId,
      },
    });
    req.user = user;
    // Get user like record
    const userLike = await likeHelper.getUserLike(user, comment);
    let result;
    // Check if user has like a comment before
    if (userLike) {
      result = await likeHelper.removeLike(user, comment);
      return res.status(200).json({
        message: 'Successfully removed like',
        data: result,
      });
    }
    result = await likeHelper.addLike(user, comment);
    return res.status(201).json({
      message: 'Successfuly added like',
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      errors: serverError(),
    });
  }
};

const updateComment = async (req, res) => {
  if (!validations.verifyUUID(req.params.commentid)) {
    return res.status(400).json({
      errors: {
        body: ['id not valid'],
      },
    });
  }

  const comment = await Comment.findOne({
    where: {
      id: req.params.commentid,
    },
  });

  if (!comment) {
    return res.status(404).json({
      errors: {
        body: ['This comment does not exist'],
      },
    });
  }

  const userId = req.user.userObj.id;
  if (userId !== comment.user_id) {
    return res.status(403).json({
      errors: {
        body: ['You are not authorized to edit this comment'],
      },
    });
  }

  const editComment = await Comment.update(
    { body: req.body.body },
    { where: { id: req.params.commentid }, returning: true }
  );

  if (req.body.body !== comment.body) {
    await CommentHistory.create({
      comment_id: comment.id,
      body: comment.body,
      is_updated: true,
    });
  }

  res.status(200).json({
    editedComment: editComment,
  });
};

const deleteComment = async (req, res) => {
  if (!validations.verifyUUID(req.params.commentid)) {
    return res.status(400).json({
      errors: {
        body: ['id not valid'],
      },
    });
  }

  const comment = await Comment.findOne({
    where: {
      id: req.params.commentid,
    },
  });

  if (!comment) {
    return res.status(404).json({
      errors: {
        body: ['This comment does not exist'],
      },
    });
  }

  const userId = req.user.userObj.id;
  if (userId !== comment.user_id) {
    return res.status(403).json({
      errors: {
        body: ['You are not authorized to delete this comment'],
      },
    });
  }

  const deleteCommentAndHistory = await Comment.destroy({
    where: { id: req.params.commentid },
    returning: true,
  });

  res.status(200).json({
    deletedComment: deleteCommentAndHistory,
  });
};

const replyComment = async (req, res) => {
  if (!validations.verifyUUID(req.params.commentid)) {
    return res.status(400).json({
      errors: {
        body: ['id not valid'],
      },
    });
  }

  const comment = await Comment.findOne({
    where: {
      id: req.params.commentid,
    },
  });

  if (!comment) {
    return res.status(404).json({
      errors: {
        body: ['This comment does not exist'],
      },
    });
  }

  const reply = await CommentHistory.create({
    comment_id: comment.id,
    body: comment.body,
    is_reply: true,
    reply: req.body.reply,
  });

  res.status(201).json({
    response: reply,
  });
};

const comments = {
  post,
  toggleLike,
  getCommentAndHistories,
  getCommentAndReplies,
  updateComment,
  deleteComment,
  replyComment,
};

export default comments;
