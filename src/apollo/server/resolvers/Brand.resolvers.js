import axios from "axios";
import { brand } from "../../../lib/models/index";

export const brandResolver = {
  Query: {
    getAllBrands: async (parent, args, context) => {
      try {
        const newBrand = await brand.find();
        return newBrand;
      } catch (err) {
        console.log(
          "🚀 ~ file: Brand.resolvers.js:13 ~ createBrand:async ~ err:",
          err
        );
      }
    },
  },
  Mutation: {
    createBrand: async (parent, args, context) => {
      console.log("Creating brand:", args.name);
      try {
        const brandExists = await brand.findOne({ name: args.name });
        if (brandExists) {
          throw new Error("Brand already exists");
        }
        const newBrand = await brand.create({ name: args.name });
        console.log("New brand created:", newBrand);
        return newBrand;
      } catch (err) {
        console.error("Error creating brand:", err);
        throw err; // Rethrow the error to be caught by GraphQL
      }
    },
  },
};
