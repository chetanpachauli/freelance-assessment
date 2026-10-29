import 'dotenv/config';

const DEFAULT_PORT = 5000;
const DEFAULT_CLIENT_ORIGIN = 'http://localhost:5173';

function requireEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

export const env = Object.freeze({
  nodeEnv: process.env.NODE_ENV ?? 'development',
  isProduction: process.env.NODE_ENV === 'production',
  port: Number(process.env.PORT) || DEFAULT_PORT,
  mongodbUri: process.env.MONGODB_URI || process.env.MONGO_URI || requireEnv('MONGODB_URI'),
  clientOrigin: process.env.CLIENT_ORIGIN ?? DEFAULT_CLIENT_ORIGIN,
  autoSeed: process.env.AUTO_SEED === 'true',
});
