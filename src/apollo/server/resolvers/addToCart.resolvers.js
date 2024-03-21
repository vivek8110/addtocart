import { product } from "../../../lib/models";
import { addToCart } from "../../../lib/models";

export const addToCartResolver = {
  Query: {
    getAllAddToCartProducts: async (parent, args, context) => {
      const userId = context.user._id;
      try {
        const allProductsInCart = await addToCart
          .find({ userId })
          .populate({
            path: "productId",
            populate: [
              { path: "brandName", populate: { path: "name" } },
              { path: "colors" },
              { path: "category" },
            ],
          })
          .populate({ path: "colorId userId" }); // Assuming colorId is a reference field to another model

        return allProductsInCart;
      } catch (err) {
        console.log(
          "🚀 ~ file: Brand.resolvers.js:13 ~ createBrand:async ~ err:",
          err
        );
      }
    },
  },
  Mutation: {
    addProductToCart: async (parent, args, context) => {
      const userId = context.user._id;
      const { productId, quantity, price, image, colorId } = args.input;

      try {
        if (!colorId) {
          return new Error("Please select color");
        }
        const existingItem = await addToCart.findOne({
          userId,
          productId,
          colorId,
        });
        console.log("Existing Item:", existingItem);

        if (existingItem) {
          const updatedItem = await addToCart.findOneAndUpdate(
            { userId, productId, colorId },
            { quantity }
          );

          return { message: "Your product has been updated in the cart." };
        }
        const newItem = await addToCart.create({
          userId,
          productId,
          quantity,
          price,
          image,
          colorId,
        });
        return { message: "Product added to cart successfully." };
      } catch (err) {
        console.error("Error adding product to cart:", err);
        throw new Error("Failed to add product to cart.");
      }
    },
    removeFromCart: async (parent, args, context) => {
      const userId = context.user._id; // Get the user ID from the context
      const id = args.id; // Get the ID of the product to remove

      try {
        // Find the product in the cart by ID and user ID, then remove it
        const removeProductFromCart = await addToCart.findOneAndDelete({
          _id: id,
          userId,
        });

        if (!removeProductFromCart) {
          throw new Error("Product not found in cart.");
        }

        console.log("Product removed from cart:", removeProductFromCart);
        return {
          message: "Product removed from cart successfully",
        };
      } catch (err) {
        console.error("Error removing product from cart:", err);
        throw new Error("Failed to remove product from cart.");
      }
    },

    UpdateQtyOfProduct: async (parent, args, context) => {
      console.log(
        "🚀 ~ file: addToCart.resolvers.js:94 ~ UpdateQtyOfProduct: ~ args:",
        args
      );
      const userId = context.user._id; // Get the user ID from the context
      const { productId, colorId, quantity } = args.input; // Destructure input arguments
      console.log("🚀 ~ file: addToCart.resolvers.js:100 ~ UpdateQtyOfProduct: ~ quantity:", quantity)

      try {
        // Get the stock of the product from the Product model
        const productStock = await product.findById(productId);
        console.log(
          "🚀 ~ file: addToCart.resolvers.js:100 ~ UpdateQtyOfProduct: ~ productStock:",
          productStock
        );
        const stock = productStock.stock;

        if (quantity > stock) {
          throw new Error(
            "You have reached the maximum limit of this product."
          );
        }

        // Find the product in the cart by productId, colorId, and userId, then update its quantity
        const updatedProduct = await addToCart.findOneAndUpdate(
          {
            productId,
            colorId,
            userId,
          },
          { quantity },
          { new: true } // Return the updated document
        );

        if (!updatedProduct) {
          throw new Error("Product not found in cart.");
        }

        console.log("Updated product:", updatedProduct);
        return { message: "Quantity updated successfully." };
      } catch (err) {
        console.error("Error updating product quantity:", err);
        throw new Error("Failed to update product quantity.");
      }
    },
    deleteCart: async (parent, args, context) => {
      const userId = context.user._id;
      try {
        const deleteCart = await addToCart.deleteMany({ userId });
        console.log(
          "🚀 ~ file: addToCart.resolvers.js:138 ~ deleteCart: ~ deleteCart:",
          deleteCart
        );

        return { message: "cart cleared successFully" };
      } catch (err) {
        console.log(
          "🚀 ~ file: addToCart.resolvers.js:138 ~ deleteCart: ~ err:",
          err
        );
      }
    },
  },
};
