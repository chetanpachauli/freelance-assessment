import { createApp } from './src/app.js';
import { connectDatabase } from './src/config/db.js';
import { env } from './src/config/env.js';
import { appointmentService } from './src/services/appointment.service.js';

const app = createApp();

let isConnected = false;

// Ensure DB is connected before handling requests
app.use(async (_req, _res, next) => {
  if (!isConnected) {
    try {
      await connectDatabase();
      await appointmentService.seedIfEmpty();
      isConnected = true;
    } catch (err) {
      console.error('Database connection error in middleware:', err.message);
    }
  }
  next();
});

// For local server execution
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(env.port, () => {
    console.log(`API listening on http://localhost:${env.port}`);
  });
}

export default app;
