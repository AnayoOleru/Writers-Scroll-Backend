import express from 'express';
import controllers from '../controllers/statistics.controller';
import middlewares from '../middlewares';

const { tokenValidator, uuidMiddleware, userIdMiddleware } = middlewares;

const statisticRoute = express.Router();

/**
 * @swagger
 *
 * /userid/statistic/daily:
 *   get:
 *     tags:
 *       - statistic
 *     description: get daily statistic of a user reading
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: userid
 *         description: Requires userid
 *         required: true
 *         schema:
 *           $ref: '#/definitions/statistic'
 *     responses:
 *       201:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Server error
 */
statisticRoute.get(
  '/:userid/statistic/daily',
  tokenValidator.verifyToken,
  userIdMiddleware.checkIfUserIdIsCorrect,
  uuidMiddleware.checkUUID,
  controllers.getDailyStatistic
);
/**
 * @swagger
 *
 * /{userid}/statistic/weekly:
 *   get:
 *     tags:
 *       - statistic
 *     description: get daily statistic of a user reading
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: userid
 *         description: Requires userid
 *         required: true
 *         schema:
 *           $ref: '#/definitions/statistic'
 *     responses:
 *       201:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Server error
 */
statisticRoute.get(
  '/:userid/statistic/week',
  tokenValidator.verifyToken,
  uuidMiddleware.checkUUID,
  userIdMiddleware.checkIfUserIdIsCorrect,
  controllers.getWeeklyStatistic
);
/**
 * @swagger
 *
 * /{userid}/statistic/month:
 *   get:
 *     tags:
 *       - statistic
 *     description: get daily statistic of a user reading
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: userid
 *         description: Required userid
 *         required: true
 *         schema:
 *           $ref: '#/definitions/statistic'
 *     responses:
 *       201:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Server error
 */
statisticRoute.get(
  '/:userid/statistic/month',
  tokenValidator.verifyToken,
  uuidMiddleware.checkUUID,
  userIdMiddleware.checkIfUserIdIsCorrect,
  controllers.getMonthlyStatistic
);

export default statisticRoute;
