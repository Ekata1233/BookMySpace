// models/OfficeTour.ts
import mongoose from "mongoose";

const officeTourSchema = new mongoose.Schema({
  title: String,
  description: String, // Change 'text' to 'description'
  image: String,
}, { timestamps: true });

export default mongoose.models.OfficeTour || mongoose.model("OfficeTour", officeTourSchema);
