import swaggerJSDoc from 'swagger-jsdoc';

// swagger definition
const swaggerDefinition = {
  info: {
    title: 'Hermes-AH Documentation',
    version: '1.0.0',
    description:
      'A community of like-minded authors to foster inspiration and innovation by leveraging the modern web',
  },
  host: 'https://hermes-ah-backend.herokuapp.com',
  basePath: '/api/v1',
  schemes: ['https', 'http'],
  securityDefinitions: {
    jwt: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
  },
  security: [{ jwt: [] }],
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc({
  swaggerDefinition,
  apis: ['./**/*.routes.js', './**/*/models/*.js'], // pass all in array
});
export default swaggerSpec;
