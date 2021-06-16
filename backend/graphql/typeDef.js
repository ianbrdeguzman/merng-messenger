import { gql } from 'apollo-server';

const typeDefs = gql`
    type User {
        username: String
        email: String
        id: ID
    }

    type Query {
        users: [User]
    }

    type Mutation {
        register(username: String!, email: String!, password: String!): User!
    }
`;

export default typeDefs;
