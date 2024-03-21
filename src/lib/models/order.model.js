import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: [
      { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true },
    ],
    total: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const order = mongoose.models.order || mongoose.model("order", OrderSchema);
export default order;
