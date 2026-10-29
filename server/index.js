import express from 'express';
import { createApp } from './src/app.js';
import { connectDatabase } from './src/config/db.js';
import { env } from './src/config/env.js';
import { appointmentService } from './src/services/appointment.service.js';

const app = express();

let dbReady = null;

function ensureDatabase() {
  if (!dbReady) {
    dbReady = (async () => {
      await connectDatabase();
      await appointmentService.seedIfEmpty();
    })().catch((err) => {
      dbReady = null;
      throw err;
    });
  }
  return dbReady;
}

// Connect before the routes run, otherwise serverless requests hit an
// unconnected Mongoose instance and fail with a 500.
app.use(async (_req, _res, next) => {
  try {
    await ensureDatabase();
    next();
  } catch (err) {
    console.error('Database connection error in middleware:', err.message);
    next(err);
  }
});

app.use(createApp());

// For local server execution
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(env.port, () => {
    console.log(`API listening on http://localhost:${env.port}`);
  });
}

export default app;
