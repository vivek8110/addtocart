import { User } from "../lib/models/index";

export const loggingIn = async (parent, args, context) => {
  try {
    const { email, password } = args.input;
    console.log(
      "🚀 ~ file: loggingIn.js:6 ~ loggingIn ~ args.input:",
      args.input
    );
    const user = await User.findOne({ email }).exec();
    if (!user) {
      return new Error("no user found with given email id");
    }
    const isMatch = await user.isPasswordCorrect(password);
    console.log(
      "🚀 ~ file: userResolver.js:67 ~ loginByUsers: ~ isMatch:",
      isMatch
    );
    if (!isMatch) {
      return new Error("password Doesn't match");
    }

    const accessToken = await user.generateAccessToken();
    console.log(
      "🚀 ~ file: user.resolvers.js:41 ~ loginByUser: ~ accessToken:",
      accessToken
    );

    return accessToken;
  } catch (err) {
    console.log(
      "🚀 ~ file: userResolver.js:68 ~ loginByUsers:async ~ err:",
      err
    );
  }
};


