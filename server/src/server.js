import { env } from './config/env.js';
import { connectDatabase, disconnectDatabase } from './config/db.js';
import { createApp } from './app.js';
import { appointmentService } from './services/appointment.service.js';

async function seedIfNeeded() {
  if (!env.autoSeed) return;
  const seeded = await appointmentService.seedIfEmpty();
  if (seeded) console.log('Seed data inserted');
}

function registerShutdown(server) {
  const shutdown = async () => {
    server.close();
    await disconnectDatabase();
    process.exit(0);
  };
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

async function bootstrap() {
  await connectDatabase();
  await seedIfNeeded();
  const server = createApp().listen(env.port, () =>
    console.log(`API listening on http://localhost:${env.port}`)
  );
  registerShutdown(server);
}

bootstrap().catch((error) => {
  console.error('Failed to start server:', error.message);
  if (error.message.includes('ECONNREFUSED') || error.name === 'MongooseServerSelectionError') {
    console.error('\n[Database Error] Could not connect to MongoDB at:', env.mongodbUri);
    console.error('Please ensure MongoDB is running:');
    console.error('  1. MongoDB Atlas: set MONGODB_URI in server/.env with your cloud connection string');
    console.error('  2. Local Service: start your local MongoDB Windows service\n');
  }
  process.exit(1);
});
