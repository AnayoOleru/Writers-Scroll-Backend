import express from 'express';
import swaggerUi from 'swagger-ui-express';
import passport from 'passport';
import session from 'express-session';
import swaggerDocument from '../documentation/swagger.json';
import routes from './routes/index';
import {
  facebookStrategy,
  twitterStrategy,
  googleStrategy,
} from './config/passport.service';

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
const port = process.env.PORT || 6000;

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
app.use('/api/v1/auth', routes);
app.get('/', (req, res) => {
  res.send('Welcome to Authors Haven');
});

app.use('/api/v1', routes);
app.all('*', (req, res) => {
  res.status(404).json({
    error: 'This route does not exist yet!',
  });
});
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App is listen on Port ${port}`);
});

export default app;
