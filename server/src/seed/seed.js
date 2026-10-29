import { connectDatabase, disconnectDatabase } from '../config/db.js';
import { appointmentService } from '../services/appointment.service.js';

async function run() {
  await connectDatabase();
  await appointmentService.resetToSeed();
  console.log('Database reset with seed appointments');
}

run()
  .catch((error) => {
    console.error('Seeding failed:', error.message);
    process.exitCode = 1;
  })
  .finally(disconnectDatabase);
