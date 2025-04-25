import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  officeId: { type: String, required: true },
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  duration: { type: Number, required: true },
  totalPay: { type: Number, required: true },
});

const Booking = mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
export default Booking;
