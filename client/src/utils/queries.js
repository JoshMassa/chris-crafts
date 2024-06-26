import { gql } from '@apollo/client';

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