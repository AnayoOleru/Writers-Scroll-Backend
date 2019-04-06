import model from '../models';
import likeHelper from '../helpers/likeHelpers';
import validations from '../helpers/validations';

const { Article, User } = model;
const serverError = {
  status: 500,
  message: 'Server error, please try again later',
};
const likeController = {
  async toggleLike(req, res) {
    // const { articleId } = req.params;
    // const { userId } = req.body;
    const token = validations.verifyAuthHeader(req);
    const { id: userId } = token.userObj;
    const { articleId } = req.params;
    try {
      // validate article and user Id
      if (
        !validations.verifyUUID(articleId) ||
        !validations.verifyUUID(userId)
      ) {
        return res.status(400).json({
          message: 'id not valid',
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
        res.status(200).json({
          status: 200,
          message: 'Successfully removed like',
          data: result,
        });
      } else {
        result = await likeHelper.addLike(user, article);
        res.status(201).json({
          status: 201,
          message: 'Successfuly added like',
          data: result,
        });
      }
    } catch (error) {
      return res.send(serverError);
    }
  },
};
export default likeController;
