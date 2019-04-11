import express from 'express';
import controllers from '../controllers/statistics.controller';
import middlewares from '../middlewares';

const { tokenValidator } = middlewares;

const statisticRoute = express.Router();

statisticRoute.get(
  '/:userid/statistic/daily',
  tokenValidator.verifyToken,
  controllers.getDailyStatistic
);
statisticRoute.get(
  '/:userid/statistic/week',
  tokenValidator.verifyToken,
  controllers.getWeeklyStatistic
);
statisticRoute.get(
  '/:userid/statistic/month',
  tokenValidator.verifyToken,
  controllers.getMonthlyStatistic
);

export default statisticRoute;
