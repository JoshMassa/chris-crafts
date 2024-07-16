import { gql } from 'graphql-tag';

const typeDefs = gql`
type CartItem {
    product: Product!
    quantity: Int!
}

type Cart {
    _id: ID!
    userId: ID!
    items: [CartItem]!
}

type Event {
    id: ID!
    title: String!
    date: String!
    location: String!
    time: String!
    description: String!
}

type Product {
    id: ID!
    title: String!
    image: String!
    price: Float!
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
    isAdmin: Boolean
}

type Query {
    events: [Event]
    products: [Product]
    user(id: ID!): User
    users: [User]
    getCart(userId: ID): Cart
    cartItems: [CartItem]!
    cart(id: ID!): Cart
}

type Mutation {
    addEvent(title: String!, date: String!, location: String!, time: String!, description: String!): Event
    addProduct(title: String!, image: String!, price: Float!, description: String!): Product
    login(email: String!, password: String!): Auth
    logout: User
    signup(username: String!, email: String!, password: String!): Auth!
    updateUser(id: ID!, input: UserUpdateInput!): User
    setAdminStatus(id: ID!, isAdmin: Boolean!): User
    addItemToCart(userId: ID!, productId: ID!, quantity: Int!): Cart
    removeItemFromCart(userId: ID!, productId: ID!): Cart
}
`

export default typeDefs;

