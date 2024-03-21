const { gql } = require("apollo-server");

const colorTypeDefs = gql`
  type color {
    id: ID!
    hexCode: String
    name: String!
  }
  input CreateColorInput {
    hexCode: String
    name: String!
  }
  type Query {
    getAllColors: [color]
  }
  type Mutation {
    createColor(input: CreateColorInput): color
  }
`;
export default colorTypeDefs;
