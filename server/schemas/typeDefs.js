import { gql } from 'graphql-tag';

const typeDefs = gql`
    type Event {
    id: ID!
    title: String!
    date: String!
    location: String!
    time: String!
    description: String!
}

type User {
    _id: ID!
    username: String!
    email: String!
    firstName: String
    lastName: String
    city: String
    state: String
    country: String
    isAdmin: Boolean!
}

type Auth {
    token: String!
    user: User!
}

input UserUpdateInput {
    firstName: String
    lastName: String
    city: String
    state: String
    country: String
}

type Query {
    events: [Event]
    user(id: ID!): User
    users: [User]
}

type Mutation {
    addEvent(title: String!, date: String!, location: String!, time: String!, description: String!): Event
    login(email: String!, password: String!): Auth
    logout: User
    signup(username: String!, email: String!, password: String!): Auth!
    updateUser(id: ID!, input: UserUpdateInput!): User
    setAdminStatus(id: ID!, isAdmin: Boolean!): User
}
`

export default typeDefs;

