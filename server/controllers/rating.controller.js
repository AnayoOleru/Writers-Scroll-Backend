import db from '../models/index';

const { User, Rating, Article } = db;

const rating = {
  post: async (req, res) => {
    /**
     * @description post article Rating
     * @param {*} req
     * @param {*} res
     * @returns {object} response and article rating data
     */

    try {
      try {
        await User.findOne({
          where: {
            id: req.body.user_id,
          },
        });
        try {
          await Article.findOne({
            where: {
              id: req.body.article_id,
            },
          });
        } catch (err) {
          res.status(404).json({
            status: 404,
            data: 'Article does not exist',
          });
        }
      } catch (err) {
        res.status(404).json({
          status: 404,
          data: 'User does not exist',
        });
      }
      const ratingDetails = await Rating.create({
        user_id: req.body.user_id,
        article_id: req.body.article_id,
        rating_value: req.body.rating_value,
      });
      res.status(200).json({
        message: 'Thank you for rating this article',
        data: ratingDetails,
      });
    } catch (err) {
      if (err.errors[0].type === 'unique violation') {
        res.status(409).json({
          status: 409,
          error: 'You have already rated this article, thank you!!!',
        });
      } else if (err.errors[0].type === 'Validation error') {
        res.status(400).json({
          status: 400,
          error: 'Rating value should range from 0 and 5',
        });
      } else {
        res.status(500).json({
          status: 500,
          error: err.errors[0].message,
        });
      }
    }
  },
};

export default rating;
