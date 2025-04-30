import mongoose from 'mongoose';

const payoutSchema = new mongoose.Schema({
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'VendorBankDetails',
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  paymentMethod: {
    type: String,
    enum: ['bank_transfer', 'upi'],
    required: true
  },
  razorpayResponse: Object,
  transactionId: {
    type: String, // Razorpay payout ID
    required: true
  },
  razorpayStatus: {
    type: String // pending, processing, processed, reversed, failed
  },
  notes: {
    type: String
  },
  paidAt: {
    type: Date,
    default: Date.now
  },
  createdByAdmin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  }
}, { timestamps: true });

export default mongoose.models.PayoutSchema || mongoose.model('PayoutSchema', payoutSchema);
