const { gql } = require("apollo-server");

const addToCartTypeDefs = gql`
  type CartItem {
    id: ID
    productId: product
    quantity: Float
    price: Int
    image: String
    colorId: color
    userId: Users
  }
  type message {
    message: String
  }
  input updateQtyOfProduct {
    productId: String
    quantity: Int
    colorId: String
  }
  input addProductToCartInput {
    productId: String
    quantity: Int
    price: Int
    image: String
    colorId: String
  }
  input increaseQtyOfProductInput {
    productId: String
    colorId: String
    quantity: Int
  }

  type Query {
    getAllAddToCartProducts: [CartItem]
  }
  type Mutation {
    addProductToCart(input: addProductToCartInput): message
    removeFromCart(id: String!): message
    UpdateQtyOfProduct(input: increaseQtyOfProductInput): message
    deleteCart: message
  }
`;
export default addToCartTypeDefs;
