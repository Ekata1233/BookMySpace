import mongoose from 'mongoose';

// Retrieve the MongoDB URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI;

// Log the MongoDB URI (for debugging purposes)
console.log("MongoDB URI: ", MONGODB_URI);

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

// Cache the database connection
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  // If the database connection is already established, return it
  if (cached.conn) {
    return cached.conn;
  }

  // If there's no active connection, attempt to connect
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  // Store the active connection once established
  cached.conn = await cached.promise;
  return cached.conn;
}

export default async function testConnection() {
  try {
    // Attempt to connect to the database
    await connectToDatabase();
    console.log('MongoDB connection successful!');
    return { success: true, message: 'Connection successful!' };
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return { success: false, message: 'Connection failed!' };
  }
}
