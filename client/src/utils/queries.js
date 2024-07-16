import { gql } from '@apollo/client';

export const GET_CART = gql`
  query GetCart($userId: ID!) {
    getCart(userId: $userId) {
      _id
      userId
      items {
        product {
          id
          title
          image
          price
          description
        }
        quantity
      }
    }
  } 
`;

export const GET_CART_ITEMS = gql`
  query GetCartItems {
    cartItems {
      id
      quantity
      product
    }
  }
`;

export const GET_EVENTS = gql`
  query GetEvents {
    events {
      id
      title
      date
      location
      time
      description
    }
  }
`;

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      title
      image
      price
      description
    }
  }
`;

export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      _id
      username
      email
      firstName
      lastName
      city
      state
      country
      isAdmin
    }
  }
`;

export const GET_USERS = gql`
  query GetUsers {
    users {
      _id
      username
      email
      firstName
      lastName
      city
      state
      country
      isAdmin
    }
  }
`;