import { gql } from "apollo-server";

const orderTypeDefs = gql`
  type order {
    _id: ID!
    userId: Users
  }

  type Query {
    getAllOrders: [order]
  }
`;
export default orderTypeDefs;
