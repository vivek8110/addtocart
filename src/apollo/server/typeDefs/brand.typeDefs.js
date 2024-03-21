const { gql } = require("apollo-server");

const brandTypeDefs = gql`
  type Brand {
    id: ID!
    name: String!
  }
  type Query {
    getAllBrands: [Brand]
  }
  type Mutation {
    createBrand(name: String): Brand
  }
`;
export default brandTypeDefs;
