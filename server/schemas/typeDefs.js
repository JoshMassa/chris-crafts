import { gql } from 'graphql-tag';

const typeDefs = gql`
type User {
    _id: ID!
    username: String!
    email: String!
}

type Auth {
    token: String!
    user: User!
}

type Query {
    user(id: ID!): User
    users: [User]
}

type Mutation {
    login(email: String!, password: String!): Auth
    signup(username: String!, email: String!, password: String!): Auth!
    logout: User
}
`

export default typeDefs;

