import model from '../models';
import likeHelper from '../helpers/like-helpers';
import validations from '../helpers/validations';
import serverError from '../helpers/server-error';

const { Article, User } = model;

const toggleLike = async (req, res) => {
  const token = validations.verifyAuthHeader(req);
  const { id: userId } = token.userObj;
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
        message: 'Successfully removed like',
        data: result,
      });
    }
    result = await likeHelper.addLike(user, article);
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

const likeController = { toggleLike };
export default likeController;
