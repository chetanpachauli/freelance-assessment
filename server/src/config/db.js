import mongoose from 'mongoose';
import { env } from './env.js';

let cachedConnection = null;

export async function connectDatabase() {
  if (cachedConnection && mongoose.connection.readyState === 1) {
    return cachedConnection;
  }
  cachedConnection = await mongoose.connect(env.mongodbUri, {
    serverSelectionTimeoutMS: 5000,
  });
  console.log('MongoDB connected');
  return cachedConnection;
}

export async function disconnectDatabase() {
  await mongoose.disconnect();
  cachedConnection = null;
}
