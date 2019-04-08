import models from '../models';
import serverError from './server-error';

const { Keyword } = models;

/**
 *
 * @param {*} articleId
 * @param {*} tags
 * @returns {*}  userId, articleId and keywords in an array.
 */
const saveArticleTags = async (articleId, tags) => {
  try {
    const Articletags = await Keyword.create({
      article_id: articleId,
      keyword: tags,
    });
    return Articletags;
  } catch (err) {
    return serverError();
  }
};

const tagging = { saveArticleTags };

export default tagging;
