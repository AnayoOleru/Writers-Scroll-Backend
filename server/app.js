import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../documentation/swagger.json';
import routes from './routes';

const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
const port = process.env.PORT || 6000;

app.get('/', (req, res) => {
  res.send('Welcome to Authors Haven');
});

app.use('/api/v1', routes);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App is listen on Port ${port}`);
});

export default app;
