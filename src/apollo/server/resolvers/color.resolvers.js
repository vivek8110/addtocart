import axios from "axios";
import { color } from "../../../lib/models/index";

export const colorResolver = {
  Query: {
    getAllColors: async (parent, args, context) => {
      try {
        const newcolor = await color.find();
        return newcolor;
      } catch (err) {
        console.log(
          "🚀 ~ file: color.resolvers.js:13 ~ createcolor:async ~ err:",
          err
        );
      }
    },
  },
  Mutation: {
    createColor: async (parent, args, context) => {
      console.log("Creating color:", args.input);
      const { name, hexCode } = args.input;
      try {
        const colorExists = await color.findOne({ name, hexCode });
        if (colorExists) {
          throw new Error("color already exists");
        }
        const newcolor = await color.create({ name, hexCode });
        console.log("New color created:", newcolor);
        return newcolor;
      } catch (err) {
        console.error("Error creating color:", err);
        throw err; // Rethrow the error to be caught by GraphQL
      }
    },
  },
};
