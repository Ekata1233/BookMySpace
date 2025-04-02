import mongoose from "mongoose";

const OfficeSpaceSchema = new mongoose.Schema(
  {
    officeSpaceName: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    amenities: {
      type: [String],
      default: [],
    },
    rate: {
      type: Number,
      required: true,
      min: 0,
    },
    isNewlyOpen: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String, // Image URL
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.models.OfficeSpace ||
  mongoose.model("OfficeSpace", OfficeSpaceSchema);
