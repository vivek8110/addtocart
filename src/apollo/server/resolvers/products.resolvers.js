import { product } from "../../../lib/models/index";

export const productsResolver = {
  Query: {
    getAllProducts: async (parent, args, context) => {
      try {
        const products = await product
          .find()
          .populate({ path: "brandName", select: "name" })
          .populate({ path: "category", select: "name" })
          .populate({ path: "colors", select: " name hexCode" });
        console.log(
          "🚀 ~ file: products.resolvers.js:12 ~ getAllProducts: ~ products:",
          products
        );
        // .populate({ path: "color", select: "name hexCode" });

        return products;
      } catch (err) {
        console.error("Error fetching products:", err);
        return new Error("Failed to fetch products.");
      }
    },
    getProductById: async (parent, args, context) => {
      console.log(
        "🚀 ~ file: products.resolvers.js:25 ~ getProductById: ~ args:",
        args
      );
      try {
        const id = args.id;
        console.log(
          "🚀 ~ file: products.resolvers.js:27 ~ getProductById: ~ id:",
          id
        );
        const productById = await product
          .findById(id)
          .populate({ path: "brandName", select: "name" })
          .populate({ path: "category", select: "name" })
          .populate({ path: "colors", select: "name hexCode" });
        console.log(
          "🚀 ~ file: products.resolvers.js:32 ~ getProductById: ~ productById:",
          productById
        );

        return productById;
      } catch (err) {
        console.log(
          "🚀 ~ file: products.resolvers.js:28 ~ getProductById:async ~ err:",
          err
        );
      }
    },
  },
  Mutation: {
    createProduct: async (parent, args, context) => {
      const { sku, ...rest } = args.input;
      console.log(
        "🚀 ~ file: products.resolvers.js:22 ~ createProduct: ~ sku:",
        args.input
      );
      try {
        const getSku = await product.findOne({ sku });
        console.log(
          "🚀 ~ file: products.resolvers.js:25 ~ createProduct: ~ getSku:",
          getSku
        );
        if (getSku !== null) {
          return new Error("please choose another Sku ");
        }

        const newProduct = await product.create(args.input);
        console.log(
          "🚀 ~ file: products.resolvers.js:43 ~ createProduct: ~ newProduct:",
          newProduct
        );

        return newProduct;
      } catch (err) {
        console.log(
          "🚀 ~ file: products.resolvers.js:50 ~ createProduct: ~ err:",
          err
        );
      }
    },
  },
};
