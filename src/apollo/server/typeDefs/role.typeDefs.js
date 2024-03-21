const { gql } = require("apollo-server");

const roleTypeDefs = gql`
  type role {
    id: ID!
    role: String
  }

  type Query {
    getAllRoles: [role]
  }
`;
export default roleTypeDefs;
