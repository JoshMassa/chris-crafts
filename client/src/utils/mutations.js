import { gql } from '@apollo/client';

export const ADD_EVENT = gql`
  mutation addEvent($title: String!, $date: String!, $location: String!, $time: String!, $description: String!) {
    addEvent(title: $title, date: $date, location: $location, time: $time, description: $description) {
      id
      title
      date
      location
      time
      description
    }
  }
`;

export const ADD_ITEM_TO_CART = gql`
  mutation AddItemToCart($userId: ID!, $productId: ID!, $quantity: Int!) {
    addItemToCart(userId: $userId, productId: $productId, quantity: $quantity) {
      _id
      userId
      items {
        productId
        quantity
      }
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation addProduct($title: String!, $image: String!, $price: Float!, $description: String!) {
    addProduct(title: $title, image: $image, price: $price, description: $description) {
      id
      title
      image
      price
      description
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const LOGOUT = gql`
  mutation logout {
    logout {
      _id
      username
    }
  }
`;

export const REMOVE_ITEM_FROM_CART = gql`
  mutation RemoveItemFromCart($userId: ID!, $productId: ID!) {
    removeItemFromCart(userId: $userId, productId: $productId) {
      items {
        productId
        quantity
      }
    }
  }
`;

export const SET_ADMIN_STATUS = gql`
  mutation SetAdminStatus($id: ID!, $isAdmin: Boolean!) {
    setAdminStatus(id: $id, isAdmin: $isAdmin) {
      _id
      username
      email
      isAdmin
    }
  }
`;

export const SIGNUP = gql`
  mutation Signup($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $input: UserUpdateInput!) {
    updateUser(id: $id, input: $input) {
      _id
      firstName
      lastName
      city
      state
      country
      isAdmin
    }
  }
`;