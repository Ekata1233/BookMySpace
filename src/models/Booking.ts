import mongoose from "mongoose";

const RazorpayBookingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  officeId: { type: String, required: true },
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  duration: { type: Number, required: true },
  totalPay: { type: Number, required: true },
  razorpayOrderId: { type: String, required: true }, 
});

// 👇 This controls the MongoDB collection name
const RazorpayBooking = mongoose.models.RazorpayBooking || mongoose.model("RazorpayBooking", RazorpayBookingSchema);

export default RazorpayBooking;
