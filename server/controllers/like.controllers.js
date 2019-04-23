import model from '../models';
import likeHelper from '../helpers/like-helpers';
import validations from '../helpers/validations';
import serverError from '../helpers/server-error';

const { Article, User } = model;

const toggleLike = async (req, res) => {
  const userId = req.user.userObj.id;
  const { articleId } = req.params;
  try {
    // validate article and user Id
    if (!validations.verifyUUID(articleId) || !validations.verifyUUID(userId)) {
      return res.status(400).json({
        errors: {
          body: ['id not valid'],
        },
      });
    }

    // Find an article by Id
    const article = await Article.findOne({
      where: {
        id: articleId,
      },
    });
    req.article = article;
    if (!article) {
      return res.status(404).json({
        errors: {
          body: ['This article does not exist'],
        },
      });
    }

    const user = await User.findOne({
      where: {
        id: userId,
      },
    });
    req.user = user;

    // Get user like record
    const userLike = await likeHelper.getUserLike(user, article);
    let result;
    // Check if user has like an article before
    if (userLike) {
      result = await likeHelper.removeLike(user, article);
      return res.status(200).json({
        message: 'You have successfully disliked this article',
        data: result,
      });
    }
    result = await likeHelper.addLike(user, article);
    return res.status(201).json({
      message: 'You have successfuly liked this article',
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      errors: serverError(),
      error,
    });
  }
};

const likeController = { toggleLike };
export default likeController;
