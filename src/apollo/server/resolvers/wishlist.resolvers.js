import axios from "axios";
import { wishlist } from "../../../lib/models/index";

export const wishlistResolver = {
  Query: {
    getAllWishListedProducts: async (parent, args, context) => {
      const userId = context.user._id;
      try {
        const wishlistedProducts = await wishlist
          .find({ userId })
          .populate("productId") // Populate only the productName field of the product
          .populate("colorId"); // Populate only the colorName field of the color

        console.log("Wishlisted products:", wishlistedProducts);

        return wishlistedProducts;
      } catch (err) {
        console.log(
          "🚀 ~ file: wishlist.resolvers.js:10 ~ getAllWishListedProducts:async ~ err:",
          err
        );
      }
    },
  },
  Mutation: {
    addProductToWishList: async (parent, args, context) => {
      const userId = context.user._id; // Get the user ID from the context
      const { productId, colorId } = args.input; // Destructure input arguments

      try {
        // Check if the product already exists in the wishlist for the user
        const existingWishlistItem = await wishlist.findOne({
          userId,
          productId,
          colorId,
        });

        if (existingWishlistItem) {
          throw new Error("Product already exists in the wishlist.");
        }

        // Create a new wishlist item
        const newWishlistItem = await wishlist.create({
          userId,
          productId,
          colorId,
        });

        console.log("New wishlist item:", newWishlistItem);

        return { message: "product added to wishlist successfully" };
      } catch (err) {
        console.error("Error adding product to wishlist:", err);
        throw new Error("Failed to add product to wishlist.");
      }
    },
    removeFromWishlist: async (parent, args, context) => {
      const userId = context.user._id; // Get the user ID from the context
      const { productId } = args; // Get the ID of the wishlist item to remove

      try {
        // Find and remove the wishlist item for the user by ID
        const removedItem = await wishlist.findOneAndDelete({
          productId,
          userId,
        });

        if (!removedItem) {
          throw new Error("Wishlist item not found.");
        }

        console.log("Removed wishlist item:", removedItem);
        return { message: "Wishlist item removed successfully." };
      } catch (err) {
        console.error("Error removing wishlist item:", err);
        throw new Error("Failed to remove wishlist item.");
      }
    },
  },
};
