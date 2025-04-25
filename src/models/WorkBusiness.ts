import mongoose, { Schema, models } from "mongoose";

const workBusinessSchema = new Schema(
  {
    title: { type: String, required: true },
    description1: { type: String, required: true },
    description2: { type: String, required: true },
    imageTop: { type: String, required: true },
    imageBottom: { type: String, required: true },
  },
  { timestamps: true },
);

const WorkBusiness =
  models.WorkBusiness || mongoose.model("WorkBusiness", workBusinessSchema);
export default WorkBusiness;
