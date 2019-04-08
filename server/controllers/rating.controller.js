import search from '../helpers/search-database';
import model from '../models';

const { Rating } = model;
const { databaseError, findArticle } = search;
const rating = {
  post: async (req, res) => {
    const userId = req.user.userObj.id;
    /**
     * @description post article Rating
     * @param {*} req
     * @param {*} res
     * @returns {object} response and article rating data
     */

    try {
      const article = await findArticle(req.body.article_id);
      if (!article) {
        return res.status(404).send({
          status: 404,
          errors: {
            body: ['Article does not exist'],
          },
        });
      }
      const ratingDetails = await Rating.create({
        user_id: userId,
        article_id: req.body.article_id,
        rating_value: req.body.rating_value,
      });
      res.status(201).json({
        message: 'Thank you for rating this article',
        rating: ratingDetails,
      });
    } catch (err) {
      databaseError(err, res);
    }
  },
};

export default rating;
