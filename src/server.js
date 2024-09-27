import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import sequelize from './config/database.js';
import nominaRoutes from './routes/nomina.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const RESET_DB = process.env.RESET_DB === 'true';

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

// Rutas
app.use('/api/nomina', nominaRoutes);

// Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Manejo de errores global
app.use(errorHandler);

// Función para iniciar el servidor
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');
    
    if (RESET_DB) {
      console.log('Reseteando la base de datos...');
      await sequelize.sync({ force: true });
      console.log('Base de datos reseteada y modelos sincronizados.');
    } else {
      await sequelize.sync({ alter: true });
      console.log('Modelos sincronizados.');
    }
    
    const server = app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${server.address().port}`);
    });
  } catch (error) {
    console.error('No se pudo iniciar el servidor:', error);
    process.exit(1);
  }
};

startServer();

export default app;