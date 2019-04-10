import models from '../models';
import serverError from '../helpers/server-error';
import validations from '../helpers/validations';

const { Statistics } = models;

/**
 * @description Get Article
 * @param {*} req
 * @param {*} res
 * @returns {object} response and user profile data
 */
const getDailyStatistic = async (req, res) => {
  try {
    if (!validations.verifyUUID(req.params.userid)) {
      return res.status(400).json({
        errors: {
          body: ['userId is not valid'],
        },
      });
    }

    const statisticBox = await Statistics.findAll({
      where: { user_id: req.params.userid },
      attributes: ['article_id', 'createdAt'],
    });
    if (!statisticBox) {
      return res.status(401).json({
        errors: {
          body: ['No statistic found for you.'],
        },
      });
    }
    if (statisticBox.createdAt >= Date.now()) {
    }
  } catch (err) {
    return serverError;
  }
};

/**
 * @description Get Article
 * @param {*} req
 * @param {*} res
 * @returns {object} response and user profile data
 */
const getWeeklyStatistic = async (req, res) => {
  try {
  } catch (err) {
    return serverError;
  }
};

/**
 * @description Get Article
 * @param {*} req
 * @param {*} res
 * @returns {object} response and user profile data
 */
const getMonthlyStatistic = async (req, res) => {
  try {
  } catch (err) {
    return serverError;
  }
};

const controller = {
  getDailyStatistic,
  getWeeklyStatistic,
  getMonthlyStatistic,
};

export default controller;
