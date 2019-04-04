// import search from '../helpers/searchDatabase';
import model from '../models';

const { Comment } = model;
// const { databaseError, findArticle } = search;

const comments = {
  post: async (req, res) => {
    /**
     * @description post comment on article
     * @param {*} req
     * @param {*} res
     * @returns {object} response from database
     */

    try {
      // const article = await findArticle(req.body.article_id);
      // if (!article) {
      //   return res.status(404).send({
      //     status: 404,
      //     errors: {
      //       body: ['Article does not exist'],
      //     },
      //   });
      // }
      const comment = await Comment.create({
        user_id: req.body.user_id,
        article_id: req.body.article_id,
        body: req.body.body,
      });
      res.status(201).json({
        status: 201,
        body: comment,
      });
    } catch (err) {
      res.status(500).json({
        err,
      });
      // databaseError(err, res);
    }
  },
};

export default comments;
