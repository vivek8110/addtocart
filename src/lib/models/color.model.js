import mongoose from "mongoose";
const colorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hexCode: { type: String, required: true },
});

const color =mongoose.models.color || mongoose.model("color", colorSchema);
export default color;
