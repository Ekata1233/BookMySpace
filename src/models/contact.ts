import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    company: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    requirement: {
      type: String,
      enum: ["officeSpace", "coworking", "meetingRoom", "privateOffice"],
      required: true,
    },
    inquiry: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema);

export default Contact;
