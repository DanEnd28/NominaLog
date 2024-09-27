import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Nóminas',
      version: '1.0.0',
      description: 'Documentación de la API de Nóminas',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Servidor de desarrollo',
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Rutas donde están los comentarios de Swagger
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;