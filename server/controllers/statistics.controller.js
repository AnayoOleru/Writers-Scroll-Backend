import moment from 'moment';
import models from '../models';
import serverError from '../helpers/server-error';

const { Statistic, Article, Sequelize } = models;

const { Op } = Sequelize;

/**
 * @description Get daily statistics of readers
 * @param {*} req
 * @param {*} res
 * @returns {object} and objevt containing the message and the number of books read by the user
 */
const getDailyStatistic = async (req, res) => {
  try {
    const statisticBox = await Statistic.findAndCountAll({
      where: {
        user_id: req.user.userObj.id,
        createdAt: {
          [Op.gte]: moment()
            .subtract(12, 'hours')
            .toDate(),
        },
      },
      attributes: ['article_id'],
      include: [
        {
          model: Article,
          attributes: ['title'],
        },
      ],
    });
    if (statisticBox.count === 0) {
      return res.status(200).json({
        message: 'You did not read any article today.',
      });
    }

    return res.status(200).json({
      message: 'Your Reading Statistic Today',
      statistic: `${statisticBox.count} article read today`,
      data: statisticBox.rows,
    });
  } catch (err) {
    return serverError;
  }
};

/**
 * @description Get weekly statistics of readers
 * @param {*} req
 * @param {*} res
 * @returns {object} and objevt containing the message and the number of books read by the user
 */
const getWeeklyStatistic = async (req, res) => {
  try {
    const statisticBox = await Statistic.findAndCountAll({
      where: {
        user_id: req.user.userObj.id,
        createdAt: {
          [Op.gte]: moment()
            .subtract(6, 'days')
            .toDate(),
        },
      },
      attributes: ['article_id'],
      include: [
        {
          model: Article,
          attributes: ['title'],
        },
      ],
    });

    if (statisticBox.count === 0) {
      return res.status(200).json({
        message: 'You did not read any article this week.',
      });
    }

    return res.status(200).json({
      message: 'Your Reading Statistic This Week',
      statistic: `${statisticBox.count} article read this week`,
      data: statisticBox.rows,
    });
  } catch (err) {
    return serverError;
  }
};

/**
 * @description Get monthly statistics of readers
 * @param {*} req
 * @param {*} res
 * @returns {object} and objevt containing the message and the number of books read by the user
 */
const getMonthlyStatistic = async (req, res) => {
  try {
    const statisticBox = await Statistic.findAndCountAll({
      where: {
        user_id: req.user.userObj.id,
        createdAt: {
          [Op.gte]: moment()
            .subtract(30, 'days')
            .toDate(),
        },
      },
      attributes: ['article_id'],
      include: [
        {
          model: Article,
          attributes: ['title'],
        },
      ],
    });

    if (statisticBox.count === 0) {
      return res.status(200).json({
        message: 'You did not read any article this month.',
      });
    }

    return res.status(200).json({
      message: 'Your Reading Statistic This Month',
      statistic: `${statisticBox.count} article read this month`,
      data: statisticBox.rows,
    });
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
