import { gql } from "@apollo/client";

export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts {
    getAllProducts {
      id
      name
      price
      image
      description
      stock
      sku

      shipping
      brandName {
        id
        name
      }
      colors {
        id
        hexCode
        name
      }
      category {
        id
        name
      }
    }
  }
`;
export const GET_PRODUCT_BY_ID = gql`
  query GetProductById($id: ID!) {
    getProductById(id: $id) {
      id
      name
      price
      image
      description
      stock
      sku
      brandName {
        name
        id
      }
      colors {
        hexCode
        id
        name
      }
      category {
        name
        id
      }
      shipping
      inStock
    }
  }
`;
export const ADD_PRODUCT_TO_CART = gql`
  mutation AddProductToCart($input: addProductToCartInput!) {
    addProductToCart(input: $input) {
      message
    }
  }
`;
export const GET_ALL_ADD_TO_CART_PRODUCT = gql`
  query GetAllAddToCartProducts {
    getAllAddToCartProducts {
      id
      productId {
        id
        name
        price
        image
        description
        stock
        sku
        brandName {
          name
        }
        colors {
          name
          hexCode
        }
        category {
          name
        }
        shipping
        inStock
      }
      quantity
      price
      image
      colorId {
        hexCode
        name
        id
      }
    }
  }
`;
export const REMOVE_PRODUCT_FROM_CART = gql`
  mutation RemoveFromCart($removeFromCartId: String!) {
    removeFromCart(id: $removeFromCartId) {
      message
    }
  }
`;
export const UPDATE_QUANTITY_OF_PRODUCT_IN_CART = gql`
  mutation UpdateQtyOfProduct($input: increaseQtyOfProductInput) {
    UpdateQtyOfProduct(input: $input) {
      message
    }
  }
`;
export const GET_ALL_BRANDS = gql`
  query GetAllBrands {
    getAllBrands {
      id
      name
    }
  }
`;

export const GET_ALL_COLORS = gql`
  query GetAllColors {
    getAllColors {
      id
      hexCode
      name
    }
  }
`;

export const GET_ALL_CATEGORIES = gql`
  query GetAllCategory {
    getAllCategory {
      id
      name
    }
  }
`;
