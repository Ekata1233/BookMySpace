import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

// Global cache for connection
let cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  // if (!cached.promise) {
  //   cached.promise = mongoose.connect(MONGODB_URI, {
  //     dbName: "BookMySpace",
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true,
  //   }).then((mongooseInstance) => {
  //     return mongooseInstance;
  //   });
  // }
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI!, {
        dbName: "BookMySpace",
      })
      .then((mongooseInstance) => {
        return mongooseInstance;
      });
  }
  cached.conn = await cached.promise;
  (global as any).mongoose = cached;
  return cached.conn;
}
export default async function testConnection() {
  try {
    // Attempt to connect to the database
    await connectToDatabase();
    console.log("MongoDB connection successful!");
    return { success: true, message: "Connection successful!" };
  } catch (error) {
    console.error("MongoDB connection error:", error);
    return { success: false, message: "Connection failed!" };
  }
}
