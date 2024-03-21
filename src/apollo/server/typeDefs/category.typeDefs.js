// const { gql } = require("apollo-server-express");
import { gql } from "apollo-server-express";

const categoryTypeDefs = gql`
  type category {
    id: ID
    name: String
  }

  type Query {
    getAllCategory: [category]
  }

  type Mutation {
    createCategory(name: String): category
  }
`;

export default categoryTypeDefs;
