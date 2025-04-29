import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IVendor extends Document {
  companyName: string;
  workEmail: string;
  phone: string;
  website?: string;
  businessType: "Individual" | "Company";
  address: string;
  message: string;
  logo: string;
  contactName: string;
  contactMobile: number;
  contactEmail: string;
  documentType: "GST" | "License" | "Other";
  documentNo: string;  // Changed from number to string to handle alphanumeric IDs
  documentImage: string;
  password: string;
  agreed: boolean;
  userId?: string;
  paid?: boolean;
  order_id?: string;
  amount?: number;
  status?: string;
  TotalEarning?: number;
  ReceivedAmount?: number;
  PendingAmount?: number;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

const VendorSchema: Schema = new Schema(
  {
    companyName: { type: String, required: true },
    workEmail: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, required: true },
    website: { type: String },
    businessType: {
      type: String,
      enum: ["Individual", "Company"],
      required: true,
    },
    address: { type: String, required: true },
    message: { type: String },
    logo: {
      type: String,
      default: "",
    },
    contactName: { type: String, required: true },
    contactMobile: { type: Number, required: true },
    contactEmail: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    documentType: {
      type: String,
      enum: ["GST", "License", "Other"],
      required: true,
    },
    documentNo: { type: String, required: true },
    documentImage: {
      type: String,
      default: "",
    },
    password: { type: String, required: true },
    agreed: { type: Boolean, required: true },
    userId: { type: String },
    paid: { type: Boolean, default: false },
    order_id: { type: String },
    amount: {
      type: Number,
      default: 0,
    },
    TotalEarning: {
      type: Number,
      default: 0,
    },
    ReceivedAmount: {
      type: Number,
      default: 0,
    },
    PendingAmount: {
      type: Number,
      default: 0,
    },
    status: { type: String, default: "pending" },
  },
  { timestamps: true },
);

VendorSchema.pre<IVendor>("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

VendorSchema.pre<IVendor>("save", function (next) {
  const total = this.TotalEarning ?? 0;
  const received = this.ReceivedAmount ?? 0;
  this.PendingAmount = total - received;
  next();
});


// Compare password method
VendorSchema.methods.comparePassword = async function (
  candidatePassword: string,
) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.models.Vendor ||
  mongoose.model<IVendor>("Vendor", VendorSchema);
