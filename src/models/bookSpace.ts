import mongoose from "mongoose";

const bookSpaceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  officeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "OfficeSpace",
    required: true,
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
    min: 1,
    max: 8,
  },
  totalPay: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const BookSpace =
  mongoose.models.BookSpace || mongoose.model("BookSpace", bookSpaceSchema);

export default BookSpace;
