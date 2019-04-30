import express from 'express';
import swaggerUi from 'swagger-ui-express';
import passport from 'passport';
import session from 'cookie-session';
import dotenv from 'dotenv';
import cors from 'cors';
import articleJob from './jobs/report-article.jobs';
import routes from './routes/index';
import swaggerSpec from './documentation/swagger';
import middlewares from './middlewares';
import {
  facebookStrategy,
  twitterStrategy,
  googleStrategy,
} from './config/passport.service';

const { trimmerMiddleware } = middlewares;

const app = express();

app.use(express.json());
app.use(trimmerMiddleware);
app.use(cors());

articleJob();
const port = process.env.PORT || 6000;

const baseUrl = '/api/v1';

passport.use(facebookStrategy);
app.use(passport.initialize());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

passport.use(facebookStrategy);
passport.use(twitterStrategy);
passport.use(googleStrategy);

dotenv.config();

app.get('/', (req, res) => {
  res.send('Welcome to Authors Haven');
});

app.get(`${baseUrl}/doc`, (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use(`${baseUrl}`, routes);
app.use(`${baseUrl}/auth`, routes);
app.use(`${baseUrl}/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// get all invalid routes
app.all('*', (req, res) => {
  res.status(404).json({
    error: 'This route does not exist yet!',
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App is listening on Port ${port}`);
});

export default app;
