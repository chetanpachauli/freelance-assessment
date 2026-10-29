import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env.js';
import routes from './routes/index.js';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware.js';

const JSON_BODY_LIMIT = '10kb';

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: true, credentials: true }));
  app.use(express.json({ limit: JSON_BODY_LIMIT }));
  if (!env.isProduction) app.use(morgan('dev'));

  app.use('/api', routes);
  app.use('/', routes);
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
