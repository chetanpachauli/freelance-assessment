// Tests never touch a real DB; this only satisfies the env validation.
process.env.MONGODB_URI ??= 'mongodb://127.0.0.1:27017/appointment_manager_test';
process.env.NODE_ENV = 'test';
