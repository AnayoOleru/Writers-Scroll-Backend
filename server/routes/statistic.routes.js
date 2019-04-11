import express from 'express';
import controllers from '../controllers/statistics.controller';
import middlewares from '../middlewares';

const { tokenValidator, uuidMiddleware, userIdMiddleware } = middlewares;

const statisticRoute = express.Router();

statisticRoute.get(
  '/:userid/statistic/daily',
  tokenValidator.verifyToken,
  userIdMiddleware.checkIfUserIdIsCorrect,
  uuidMiddleware.checkUUID,
  controllers.getDailyStatistic
);
statisticRoute.get(
  '/:userid/statistic/week',
  tokenValidator.verifyToken,
  uuidMiddleware.checkUUID,
  userIdMiddleware.checkIfUserIdIsCorrect,
  controllers.getWeeklyStatistic
);
statisticRoute.get(
  '/:userid/statistic/month',
  tokenValidator.verifyToken,
  uuidMiddleware.checkUUID,
  userIdMiddleware.checkIfUserIdIsCorrect,
  controllers.getMonthlyStatistic
);

export default statisticRoute;
