import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from '../server/src/routes/index.js';
import { errorHandler, notFoundHandler } from '../server/src/middlewares/error.middleware.js';
import { connectDatabase } from '../server/src/config/db.js';
import { appointmentService } from '../server/src/services/appointment.service.js';

const app = express();

app.use(helmet());
app.use(cors({ origin: true }));
app.use(express.json({ limit: '10kb' }));

app.use('/api', routes);
app.use(notFoundHandler);
app.use(errorHandler);

let isConnected = false;

export default async function handler(req, res) {
  if (!isConnected) {
    await connectDatabase();
    try {
      await appointmentService.seedIfEmpty();
    } catch (err) {
      console.warn('Seed check warning:', err.message);
    }
    isConnected = true;
  }
  return app(req, res);
}
