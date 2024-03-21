import {
  productsTypeDefs,
  brandTypeDefs,
  categoryTypeDefs,
  colorTypeDefs,
  addToCartTypeDefs,
  wishListTypeDefs,
  userTypeDefs,
  roleTypeDefs,
  orderTypeDefs,
} from "../apollo/server/typeDefs/index";
export const combineTypeDefs = [
  productsTypeDefs,
  brandTypeDefs,
  categoryTypeDefs,
  colorTypeDefs,
  addToCartTypeDefs,
  wishListTypeDefs,
  userTypeDefs,
  orderTypeDefs,
  roleTypeDefs,
];
