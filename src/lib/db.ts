import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("🚨 Please define the MONGODB_URI environment variable in .env.local");
}

// Global cache to prevent multiple connections in development
let cached = (global as any).mongoose || { conn: null, promise: null };
console.log("MONGODB_URI:", process.env.MONGODB_URI);

if (!cached.conn) {
  cached.promise = mongoose.connect(MONGODB_URI, {
    dbName: "BookMySpace", // Optional: Replace with your actual database name
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then((mongooseInstance) => {
    console.log("✅ MongoDB connected successfully!");
    return mongooseInstance;
  }).catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    throw err;
  });

  cached.conn = cached.promise;
}

export async function connectToDatabase() {
  return cached.conn;
}

export default async function testConnection() {
  try {
    await connectToDatabase();
    console.log("✅ MongoDB connection test successful!");
    return { success: true, message: "MongoDB connection successful!" };
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    return { success: false, message: "MongoDB connection failed!" };
  }
}
