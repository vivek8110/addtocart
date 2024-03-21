import {
  productsResolver,
  brandResolver,
  categoryResolver,
  colorResolver,
  addToCartResolver,
  wishlistResolver,
  userResolver,
  roleResolver,
} from "../apollo/server/resolvers/index";
import { merge } from "lodash";

export const combineResolvers = merge(
  productsResolver,
  brandResolver,
  wishlistResolver,
  userResolver,
  categoryResolver,
  addToCartResolver,
  colorResolver,
  roleResolver
);
