import mongoose from "mongoose";

const OfficeSpaceSchema = new mongoose.Schema(
  {
    officeSpaceName: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Office Space",
        "Coworking",
        "Virtual Space",
        "Meeting Room",
        "Private Office",
        "Day Office",
        "Hot Desks",
        "Dedicated Desks",
      ],
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    extraDescription: {
      type: String,
      required: true,
    },
    amenities: {
      type: [String],
      default: [
        "Work Desk",
        "Private Cabins",
        "24x7 Availability",
        "High Speed Internet",
        "Conference Rooms",
        "Discussion Rooms",
        "Office Assistance",
        "Meeting Rooms",
        "Power Backup",
        "Security",
        "HouseKeeping",
        "Pantry",
      ],
    },
    rate: {
      type: Number,
      required: true,
    },
    ratePerMonth: {
      type: Number,
    },
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    thumbnailImage: {
      type: String,
      default: "",
    },
    multiImages: {
      type: [String],
      default: [],
    },
    isNewlyOpen: {
      type: Boolean,
      default: false,
    },
    isAdminApprove: {
      type: Boolean,
      default: false,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.models.OfficeSpace ||
  mongoose.model("OfficeSpace", OfficeSpaceSchema);
