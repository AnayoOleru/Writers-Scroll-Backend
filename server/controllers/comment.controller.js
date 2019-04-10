import search from '../helpers/search-database';
import model from '../models';
import validations from '../helpers/validations';

const { Comment, Comment_history: CommentHistory } = model;
const { databaseError, findArticle } = search;

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

const comments = { post, getCommentAndHistories };

export default comments;
