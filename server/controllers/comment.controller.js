import search from '../helpers/search-database';
import model from '../models';
import validations from '../helpers/validations';
import likeHelper from '../helpers/like-comment-helpers';
import serverError from '../helpers/server-error';

const { User, Comment, Comment_history: CommentHistory } = model;
const { databaseError, findArticle } = search;

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
        as: 'updatedComments',
        attributes: ['id', 'comment_id', 'body', 'updatedAt', 'createdAt'],
      },
    ],
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

const comments = { post, toggleLike, getCommentAndHistories };

export default comments;
