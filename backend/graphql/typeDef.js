import { gql } from 'apollo-server';

const typeDefs = gql`
    type User {
        username: String!
        email: String!
        token: String
    }

    type Query {
        users: [User]
        login(username: String!, password: String!): User!
    }

    type Mutation {
        register(username: String!, email: String!, password: String!): User!
    }
`;

export default typeDefs;
