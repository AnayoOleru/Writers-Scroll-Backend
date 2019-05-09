import model from '../models';
import bookmarkHelper from '../helpers/bookmark-helpers';
import validations from '../helpers/validations';
import serverError from '../helpers/server-error';

const { Article, User, Bookmark } = model;

const toggleBookmark = async (req, res) => {
  const token = validations.verifyAuthHeader(req);
  const { id: userId } = token.userObj;
  const { articleId } = req.params;
  try {
    if (!validations.verifyUUID(articleId) || !validations.verifyUUID(userId)) {
      return res.status(400).json({
        errors: {
          body: ['id not valid'],
        },
      });
    }

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

    const userBookmark = await bookmarkHelper.getUserBookmarks(user, article);
    let result;

    if (userBookmark) {
      result = await bookmarkHelper.removeBookmark(user, article);
      return res.status(200).json({
        message: 'Successfully removed Bookmark',
        data: result,
      });
    }
    result = await bookmarkHelper.addBookmark(user, article);
    return res.status(201).json({
      message: 'Successfuly added Bookmark',
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      errors: serverError(),
    });
  }
};

const getBookMarkedArticlesForUser = async (req, res) => {
  try {
    const bookmarkedArticles = await Bookmark.findAll({
      where: {
        user_id: req.user.userObj.id,
      },
      attributes: ['article_id'],
      include: [
        {
          model: Article,
          attributes: [
            'title',
            'image_url',
            'abstract',
            'likes_count',
            'reading_time',
          ],
        },
      ],
    });

    return res.status(200).json({
      message: 'Articles you bookmarked',
      data: bookmarkedArticles,
    });
  } catch (error) {
    return res.status(500).json({
      errors: serverError(),
    });
  }
};

const bookmarkController = { toggleBookmark, getBookMarkedArticlesForUser };
export default bookmarkController;
