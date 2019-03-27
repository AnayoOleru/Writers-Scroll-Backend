import express from 'express';

const app = express();

app.use(express.json());

const port = process.env.PORT || 6000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App is listen on Port ${port}`);
});

export default app;
