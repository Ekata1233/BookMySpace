import mongoose from "mongoose";

const VendorBankDetailsSchema = new mongoose.Schema(
  {
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    bankName: {
      type: String,
      required: true,
      trim: true,
    },
    accountHolder: {
      type: String,
      required: true,
      trim: true,
    },
    accountNumber: {
      type: String,
      required: true,
      trim: true,
    },
    ifscCode: {
      type: String,
      required: true,
      trim: true,
    },
    branchName: {
      type: String,
      trim: true,
    },
    accountType: {
      type: String,
      enum: ["Savings", "Current"],
      default: "Savings",
    },
    phone: {
      type: String,
      trim: true,
    },
    upiId: {
      type: String,
      trim: true,
     
    },
    bankProof: {
      type: String,
      default: "",
    },
    verification: {
      type: String,
      enum: ["Pending", "Verified", "Rejected"],
      default: "Pending",
    },
    isDeleted: {
      type: Boolean,
      default: false, // default is false, indicating the record is not deleted
    },
  },
  { timestamps: true },
);

export default mongoose.models.VendorBankDetails ||
  mongoose.model("VendorBankDetails", VendorBankDetailsSchema);
