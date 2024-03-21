import { makeExecutableSchema } from "@graphql-tools/schema";
import { combineTypeDefs } from "./mergeTypeDefs";
import { combineResolvers } from "./mergeResolvers";
export const schema = makeExecutableSchema({
  typeDefs: combineTypeDefs,
  resolvers: combineResolvers,
});
