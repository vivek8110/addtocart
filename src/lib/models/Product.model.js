import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
  inStock: { type: Boolean, default: false },
  stock: { type: Number, default: 0 },
  image: [{ type: String }],
  brandName: { type: mongoose.Schema.Types.ObjectId, ref: "brand" },
  sku: { type: String, required: true },
  colors: [{ type: mongoose.Schema.Types.ObjectId, ref: "color" }],
  shipping: { type: Boolean, default: false },
});

const product =
  mongoose.models.product || mongoose.model("product", productSchema);
export default product;
