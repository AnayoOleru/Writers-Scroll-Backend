import search from '../helpers/search-database';
import model from '../models';
import likeHelper from '../helpers/like-comment-helpers';
import commentHelper from '../helpers/comment-helpers';
import notifications from '../helpers/notifications';

const {
  User,
  Comment,
  Comment_history: CommentHistory,
  Comment_reply: CommentReply,
} = model;
const { databaseError, findArticle } = search;
const getCommentAndReplies = async (req, res) => {
  const commentReplies = await commentHelper.getCommentAndReplies(
    Comment,
    CommentReply,
    req.params.commentid
  );

  return res.status(200).json({
    comment: commentReplies,
  });
};

const getCommentAndHistories = async (req, res) => {
  const editHistory = await commentHelper.getCommentAndHistories(
    Comment,
    CommentHistory,
    req.params.commentid
  );

  return res.status(200).json({
    comment: editHistory,
  });
};

const post = async (req, res) => {
  const userId = req.user.userObj.id;

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

    notifications.sendEmailNotificationComment(
      req.body.article_id,
      article.title,
      article.user_id
    );
    res.status(201).json({
      comment,
    });
  } catch (err) {
    databaseError(err, res);
  }
};

const toggleLike = async (req, res) => {
  const userId = req.user.userObj.id;
  const user = await User.findOne({
    where: {
      id: userId,
    },
  });

  // Get user like record
  const userLike = await likeHelper.getUserLike(user, res.locals.comment);

  let result;
  // Check if user has liked a comment before
  if (userLike) {
    result = await likeHelper.removeLike(user, res.locals.comment);
    return res.status(200).json({
      message: 'Successfully removed like',
      data: result,
    });
  }

  result = await likeHelper.addLike(user, res.locals.comment);
  return res.status(201).json({
    message: 'Successfuly added like',
    data: result,
  });
};

const updateComment = async (req, res) => {
  const userId = req.user.userObj.id;
  if (userId !== res.locals.comment.user_id) {
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

  if (req.body.body !== res.locals.comment.body) {
    await CommentHistory.create({
      comment_id: res.locals.comment.id,
      body: res.locals.comment.body,
    });
  }

  // editcomment[1] is actually the second element from the editComment array
  res.status(200).json({
    editedComment: editComment[1],
  });
};

const replyComment = async (req, res) => {
  const userId = req.user.userObj.id;
  const reply = await CommentReply.create({
    comment_id: res.locals.comment.id,
    user_id: userId,
    body: res.locals.comment.body,
    is_reply: true,
    reply: req.body.reply,
  });

  res.status(201).json({
    response: reply,
  });
};

const deleteComment = async (req, res) => {
  const userId = req.user.userObj.id;
  if (userId !== res.locals.comment.user_id) {
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
