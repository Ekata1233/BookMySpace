import mongoose from "mongoose";

const ExploreOfficeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.models.ExploreOffice ||
  mongoose.model("ExploreOffice", ExploreOfficeSchema);
