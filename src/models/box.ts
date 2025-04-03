import mongoose from "mongoose";

const boxSchema = new mongoose.Schema(
  {
    icon: { type: String, required: true },
    link: { type: String, required: true, trim: true },
    text: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const Box = mongoose.models.Box || mongoose.model("Box", boxSchema);
export default Box;
