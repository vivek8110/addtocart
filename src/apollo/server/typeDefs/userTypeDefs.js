const { gql } = require("apollo-server");

const userTypeDefs = gql`
  type Users {
    id: ID
    name: String
    email: String
    phone: Float
    address: String
    role: role
    orders: [order]
    wishlist: [wishListedProducts]
    cart: [CartItem]
  }
  input UserInput {
    name: String
    email: String
    phone: Float
    address: String
    password: String
  }
  type loginResponse {
    message: String
    token: String
  }
  input loginInput {
    email: String!
    password: String!
  }
  type Query {
    getAllUsers: Users
  }
  type Mutation {
    CreateUser(input: UserInput): message
    loginByUser(input: loginInput): loginResponse
  }
`;
export default userTypeDefs;
