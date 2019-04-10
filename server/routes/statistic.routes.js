import express from 'express';
import controllers from '../controllers';
import middlewares from '../middlewares';

const {} = middlewares;
const {} = controllers;

const statisticRoute = express.Router();

statisticRoute.post('/:userid/statistic/daily');
statisticRoute.get('/:userid/statistic/week');
statisticRoute.get('/:userid/statistic/month');

export default statisticRoute;
