import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($input: UserInput) {
    CreateUser(input: $input) {
      message
    }
  }
`;
export const LOGIN_BY_USERS = gql`
  mutation LoginByUser($input: loginInput) {
    loginByUser(input: $input) {
      message
      token
    }
  }
`;
export const DELETE_USERS_CART = gql`
  mutation DeleteCart {
    deleteCart {
      message
    }
  }
`;
