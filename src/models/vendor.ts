// 1. SCHEMA: /models/Vendor.ts
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
  documentNo: number;
  documentImage: string;
  password: string;
  agreed: boolean;
  userId?: string;
  paid?: boolean;
  order_id?: string;
  amount?: number;
  status?: string;
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
    documentNo: { type: Number, required: true },
    documentImage: {
      type: String,
      default: "",
    },
    password: { type: String, required: true },
    agreed: { type: Boolean, required: true },
    userId: { type: String },
    paid: { type: Boolean, default: false },
    order_id: { type: String },
    amount: { type: Number },
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

// Compare password method
VendorSchema.methods.comparePassword = async function (
  candidatePassword: string,
) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.models.Vendor ||
  mongoose.model<IVendor>("Vendor", VendorSchema);
