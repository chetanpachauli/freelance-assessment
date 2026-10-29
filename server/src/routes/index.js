import { Router } from 'express';
import appointmentRoutes from './appointment.routes.js';
import { connectDatabase } from '../config/db.js';
import { env } from '../config/env.js';

const router = Router();

router.get('/health', async (_req, res) => {
  let dbStatus = 'disconnected';
  let dbError = null;
  try {
    await connectDatabase();
    dbStatus = 'connected';
  } catch (err) {
    dbError = err.message;
  }
  res.json({
    success: true,
    data: {
      status: 'ok',
      dbStatus,
      dbError,
      mongoUriConfigured: Boolean(env.mongodbUri),
      mongoHost: env.mongodbUri ? env.mongodbUri.split('@')[1]?.split('/')[0] : null,
    },
  });
});

router.use('/appointments', appointmentRoutes);

export default router;
