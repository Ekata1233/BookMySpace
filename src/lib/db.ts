import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default async function testConnection() {
  try {
    await connectToDatabase();
    console.log('MongoDB connection successful!');
    return { success: true, message: 'Connection successful!' };
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return { success: false, message: 'Connection failed!' };
  }
}