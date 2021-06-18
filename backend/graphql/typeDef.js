import { gql } from 'apollo-server';

const typeDefs = gql`
    type User {
        username: String!
        email: String!
        token: String
        createdAt: String!
    }
    type Message {
        content: String!
        from: String!
        to: String!
        createdAt: String!
    }
    type Query {
        users: [User]
        login(username: String!, password: String!): User!
    }

    type Mutation {
        register(username: String!, email: String!, password: String!): User!
        sendMessage(content: String!, to: String!): Message!
    }
`;

export default typeDefs;
