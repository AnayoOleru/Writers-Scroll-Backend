import express from 'express';
import controllers from '../controllers/statistics.controller';
import middlewares from '../middlewares';

const { tokenValidator } = middlewares;

const statisticRoute = express.Router();

/**
 * @swagger
 *
 * /statistics/daily:
 *   get:
 *     tags:
 *       - statistic
 *     description: get daily statistic of a user reading
 *     produces:
 *       - application/json
 *     parameters:
 *         schema:
 *           $ref: '#/definitions/statistics/daily'
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: server error
 */
statisticRoute.get(
  '/statistics/daily',
  tokenValidator.verifyToken,
  controllers.getDailyStatistic
);
/**
 * @swagger
 *
 * /statistics/week:
 *   get:
 *     tags:
 *       - statistic
 *     description: get weekly statistic of a user reading
 *     produces:
 *       - application/json
 *     parameters:
 *         schema:
 *           $ref: '#/definitions/statistics/week'
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: server error
 */
statisticRoute.get(
  '/statistics/week',
  tokenValidator.verifyToken,
  controllers.getWeeklyStatistic
);
/**
 * @swagger
 *
 * /statistics/month:
 *   get:
 *     tags:
 *       - statistic
 *     description: get daily statistic of a user reading
 *     produces:
 *       - application/json
 *     parameters:
 *         schema:
 *           $ref: '#/definitions/statistics/month'
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: server error
 */
statisticRoute.get(
  '/statistics/month',
  tokenValidator.verifyToken,
  controllers.getMonthlyStatistic
);
export default statisticRoute;
