// const { gql } = require("apollo-server-express");
import { gql } from "apollo-server-express";

const productsTypeDefs = gql`
  type product {
    id: ID
    name: String
    price: Float
    image: [String]
    description: String
    stock: Int
    sku: String
    brandName: Brand
    colors: [color]
    category: category
    shipping: Boolean
    inStock: Boolean
  }
  input createProductInput {
    name: String
    price: Float
    image: [String]
    description: String
    stock: Int
    sku: String
    brandName: String
    colors: [String]
    category: String
    shipping: Boolean
    inStock: Boolean
  }
  type Query {
    getAllProducts: [product]
    getProductById(id: ID!): product
  }
  type Mutation {
    createProduct(input: createProductInput): product
  }
`;

export default productsTypeDefs;
