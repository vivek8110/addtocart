import { User, role } from "../../../lib/models";
import { loggingIn } from "../../../utils/loginResolverForAuth";
import { AuthenticateUser } from "../../../utils/authenticateUser";
import { combineResolvers } from "graphql-resolvers";

export const userResolver = {
  Query: {
    getAllUsers: combineResolvers(
      AuthenticateUser,
      async (parent, args, context) => {
        // console.log("🚀 ~ file: user.resolvers.js:7 ~ getAllUsers: ~ _id:", _id);
        // const allUsers = await User.findById(_id).populate("role");

        return allUsers;
      }
    ),
  },
  Mutation: {
    CreateUser: async (_, { input }) => {
      try {
        console.log("🚀 ~ createUser ~ input:", input.email);

        const isExistingUser = await User.findOne({ email: input.email });
        console.log(
          "🚀 ~ file: user.resolvers.js:24 ~ CreateUser: ~ isExistingUser:",
          isExistingUser
        );
        if (isExistingUser) {
          return new Error("Email is already in use");
        }

        const UserRole = await role.findOne({ role: "user" }).select("_id");
        console.log(
          "🚀 ~ file: user.resolvers.js:33 ~ CreateUser: ~  input.role:",
          UserRole
        );
        const newUser = new User({
          role: UserRole,
          ...input,
        });

        const savedUser = await newUser.save();
        console.log(
          "🚀 ~ file: user.resolvers.js:43 ~ CreateUser: ~ savedUser:",
          savedUser
        );

        if (!savedUser) {
          return new Error("Failed to create user");
        }

        return { message: "registered successfully" };
      } catch (error) {
        console.error("Failed to create user:", error.message);
        return new Error("Failed to create user. Please try again later.");
      }
    },

    loginByUser: async (parent, args, context) => {
      try {
        const accessToken = await loggingIn(parent, args, context);
        console.log(
          "🚀 ~ file: user.resolvers.js:40 ~ loginByUser: ~ accessToken:",
          accessToken
        );

        return {
          message: "successFully login",
          token: accessToken,
        };
      } catch (err) {
        console.log(
          "🚀 ~ file: user.resolvers.js:72 ~ loginByUser:async ~ err:",
          err
        );
      }
    },
  },
};
