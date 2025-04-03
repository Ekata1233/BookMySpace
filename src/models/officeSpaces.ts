import mongoose from "mongoose";

const OfficeSpaceSchema = new mongoose.Schema({
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
      "Virtual Office",
      "Meeting Room",
      "Private Office"
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
      "Pantry"
    ],
  },
  rate: {
    type: Number,
    required: true,
  },
  image: {
    type: String, 
    default: "",
  },
  isNewlyOpen: {
    type: Boolean,

    default: false,
  },
  isAdminApprove: {
    type: Boolean,
    default: true,
  },
  isDelete: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

export default mongoose.models.OfficeSpace ||
  mongoose.model("OfficeSpace", OfficeSpaceSchema);

