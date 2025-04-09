// 1. SCHEMA: /models/Vendor.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IVendor extends Document {
  name: string;
  companyName: string;
  workEmail: string;
  phone: string;
  address: string;
  website?: string;
  businessType: 'Individual' | 'Company';
  message: string;
  agreed: boolean;
}

const VendorSchema: Schema = new Schema({
  order_id: { type: String },
  amount: { type: Number },
  status: { type: String, default: "pending" }, // or required: true
  name: { type: String, required: true },
  companyName: { type: String, required: true },
  workEmail: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  website: { type: String },
  businessType: { type: String, enum: ['Individual', 'Company'], required: true },
  message: { type: String },
  agreed: { type: Boolean, required: true },
  userId: { type: String },
  paid: { type: Boolean, default: false },
}, { timestamps: true });


export default mongoose.models.Vendor || mongoose.model<IVendor>('Vendor', VendorSchema);
