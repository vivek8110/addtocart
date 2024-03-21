import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { connectDBHandler } from "../../../lib/db";
import { schema } from "../../../utils/schema";
import jwt from "jsonwebtoken";
import { headers } from "next/headers";

const apolloServer = new ApolloServer({
  schema,
  formatError: (error) => {
    const message = error.message
      .replace("SequelizeValidationError: ", "")
      .replace("Validation error: ", "")
      .replace("Context creation failed: ", "")
      .replace("Unexpected error value: ", "");
    return { ...error, message };
  },
});

const handler = connectDBHandler(
  startServerAndCreateNextHandler(apolloServer, {
    context: async (req) => {
      // console.log("🚀 ~ context: ~ req.headers.authorization:", req.headers.authorization)
      const token = headers().get("authorization") || "";
      // console.log("🚀 ~ token:", token);
      try {
        if (!token) {
          return new Error("Authorization token is missing");
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        // console.log("🚀 ~ decoded:", decoded);
        return { user: decoded };
      } catch (error) {
        console.log("🚀 ~ error:", error.message);

        return { error: "Invalid token", errorMessage: error.message };
      }
    },
  })
);

export { handler as GET, handler as POST };

// Add some logging
console.log("Server setup completed");
