import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "role",
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "order",
      },
    ],
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cart",
    },
    wishlist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "wishlist",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateAccessToken = async function () {
  const userObject = { ...this.toObject() };
  return jwt.sign(userObject, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
