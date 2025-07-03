// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Voyag-log Travel Blog API',
      version: '1.0.0',
      description: 'API documentation for Voyag-log Travel Blog backend',
    },
    servers: [
      {
        url: 'http://localhost:8080', 
      },
    ],
  },
  apis: ['./routes/*.js'], // where your route files are
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
