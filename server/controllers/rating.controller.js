import search from '../helpers/searchDatabase';
import model from '../models';

const { Rating } = model;
const { databaseError, findArticle } = search;

const rating = {
  post: async (req, res) => {
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
        user_id: req.body.user_id,
        article_id: req.body.article_id,
        rating_value: req.body.rating_value,
      });
      res.status(201).json({
        message: 'Thank you for rating this article',
        data: ratingDetails,
      });
    } catch (err) {
      databaseError(err, res);
    }
  },
};

export default rating;
