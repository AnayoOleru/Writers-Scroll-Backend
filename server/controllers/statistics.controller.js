import moment from 'moment';
import models from '../models';
import serverError from '../helpers/server-error';
import validations from '../helpers/validations';
import auth from '../helpers/auth';

const { Statistic, Sequelize } = models;

const { Op } = Sequelize;

/**
 * @description Get daily statistics of readers
 * @param {*} req
 * @param {*} res
 * @returns {object} and objevt containing the message and the number of books read by the user
 */
const getDailyStatistic = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const checkIfIdIsCorrect = auth.decode(token);

    if (!validations.verifyUUID(req.params.userid)) {
      return res.status(400).json({
        errors: {
          body: ['userId is not valid'],
        },
      });
    }
    if (req.params.userid !== checkIfIdIsCorrect.userObj.id) {
      return res.status(401).json({
        errors: {
          body: ["Sorry, you cannot access another user's reading statistic"],
        },
      });
    }
    const statisticBox = await Statistic.findAndCountAll({
      where: {
        user_id: req.params.userid,
        createdAt: {
          [Op.gte]: moment()
            .subtract(12, 'hours')
            .toDate(),
        },
      },
      attributes: ['article_id', 'createdAt'],
    });
    if (statisticBox.count === 0) {
      return res.status(200).json({
        message: 'You did not read any article today.',
      });
    }

    return res.status(200).json({
      message: 'Your Reading Statistic Today',
      statistic: `${statisticBox.count} article read today`,
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
    const token = req.headers.authorization;
    const checkIfIdIsCorrect = auth.decode(token);

    if (!validations.verifyUUID(req.params.userid)) {
      return res.status(400).json({
        errors: {
          body: ['userId is not valid'],
        },
      });
    }

    if (req.params.userid !== checkIfIdIsCorrect.userObj.id) {
      return res.status(401).json({
        errors: {
          body: ["Sorry, you cannot access another user's reading statistic"],
        },
      });
    }
    const statisticBox = await Statistic.findAndCountAll({
      where: {
        user_id: req.params.userid,
        createdAt: {
          [Op.gte]: moment()
            .subtract(6, 'days')
            .toDate(),
        },
      },
      attributes: ['article_id', 'createdAt'],
    });

    if (statisticBox.count === 0) {
      return res.status(200).json({
        message: 'You did not read any article this week.',
      });
    }

    return res.status(200).json({
      message: 'Your Reading Statistic This week',
      statistic: `${statisticBox.count} article read this week`,
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
    const token = req.headers.authorization;
    const checkIfIdIsCorrect = auth.decode(token);

    if (!validations.verifyUUID(req.params.userid)) {
      return res.status(400).json({
        errors: {
          body: ['userId is not valid'],
        },
      });
    }

    if (req.params.userid !== checkIfIdIsCorrect.userObj.id) {
      return res.status(401).json({
        errors: {
          body: ["Sorry, you cannot access another user's reading statistic"],
        },
      });
    }

    const statisticBox = await Statistic.findAndCountAll({
      where: {
        user_id: req.params.userid,
        createdAt: {
          [Op.gte]: moment()
            .subtract(30, 'days')
            .toDate(),
        },
      },
      attributes: ['article_id', 'createdAt'],
    });

    if (statisticBox.count === 0) {
      return res.status(200).json({
        message: 'You did not read any article this month.',
      });
    }

    return res.status(200).json({
      message: 'Your Reading Statistic This week',
      statistic: `${statisticBox.count} article read this month`,
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
