import mongoose from "mongoose";

const WishlistSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
  },
  colorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "color",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const wishlist =
  mongoose.models.wishlist || mongoose.model("wishlist", WishlistSchema);
export default wishlist;
