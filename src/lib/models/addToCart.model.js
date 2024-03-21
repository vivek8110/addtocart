import mongoose from "mongoose";
const addToCartSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
  quantity: { type: Number, required: true },
  price: { type: String, required: true },
  image: { type: String, required: true },
  colorId: { type: mongoose.Schema.Types.ObjectId, ref: "color" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const addToCart =
  mongoose.models.addToCart || mongoose.model("addToCart", addToCartSchema);
export default addToCart;
