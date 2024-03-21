import { User } from "../lib/models";
const { skip } = require("graphql-resolvers");

export const AuthenticateUser = async (parent, args, context) => {
  try {
    const userId = context.user._id;
    console.log(
      "🚀 ~ file: authenticateUser.js:4 ~ AuthenticateUser ~ userId:",
      userId
    );
    const allUsers = await User.findById(userId).populate("role");

    const role = allUsers.role.role;
    console.log(
      "🚀 ~ file: authenticateUser.js:13 ~ AuthenticateUser ~ role:",
      role
    );
    if (role !== "user") {
      return new Error("not authenticated");
    }
    return skip;
  } catch (err) {
    console.log(
      "🚀 ~ file: authenticateUser.js:6 ~ AuthenticateUser ~ err:",
      err
    );
  }
};
