import { Router } from 'express';
import appointmentRoutes from './appointment.routes.js';

const router = Router();

router.get('/health', (_req, res) => res.json({ success: true, data: { status: 'ok' } }));
router.use('/appointments', appointmentRoutes);

export default router;
