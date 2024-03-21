const { gql } = require("apollo-server");

const wishListTypeDefs = gql`
  type wishListedProducts {
    id: ID
    productId: product
    colorId: color
  }

  input addProductTowishListInput {
    productId: String
    colorId: String
  }
  type Query {
    getAllWishListedProducts: [wishListedProducts]
  }
  type Mutation {
    addProductToWishList(input: addProductTowishListInput): message
    removeFromWishlist(productId: ID): message
  }
`;
export default wishListTypeDefs;
