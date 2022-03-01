import 'reflect-metadata'; // We need this in order to use @Decorators
import cors from 'cors';
import express, { Express } from 'express';
import routes from './routes';

const app: Express = express();
app.use(express.json());

export const initApp = () => {
  app.use('/', routes);

  app.use((error, req, res, next) => {
    return res.status(error.status || 500).send({
      code: error.status,
      error: true,
      message: error.message,
    });
  });

  return app;
};
