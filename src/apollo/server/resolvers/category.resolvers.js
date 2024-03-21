import axios from "axios";
import { category } from "../../../lib/models/index";

export const categoryResolver = {
  Query: {
    getAllCategory: async (parent, args, context) => {
      try {
        const allCategory = await category.find();
        return allCategory;
      } catch (err) {
        console.log(
          "🚀 ~ file: category.resolvers.js:13 ~ createcategory:async ~ err:",
          err
        );
      }
    },
  },
  Mutation: {
    createCategory: async (parent, args, context) => {
      console.log("Creating category:", args.name);
      try {
        const categoryExists = await category.findOne({ name: args.name });
        if (categoryExists) {
          throw new Error("category already exists");
        }
        const newcategory = await category.create({ name: args.name });
        console.log("New category created:", newcategory);
        return newcategory;
      } catch (err) {
        console.error("Error creating category:", err);
        throw err; // Rethrow the error to be caught by GraphQL
      }
    },
  },
};
