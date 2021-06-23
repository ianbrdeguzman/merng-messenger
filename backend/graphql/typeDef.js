import { gql } from 'apollo-server';

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String
        token: String
        createdAt: String!
        imageUrl: String!
        latestMessage: Message
    }
    type Message {
        _id: ID!
        content: String!
        from: String!
        to: String!
        createdAt: String!
        reactions: [Reaction]
    }
    type Reaction {
        _id: ID!
        content: String!
        createdAt: String!
        messageId: String!
        userId: String!
        message: Message!
        user: User!
    }
    type Query {
        users: [User]
        login(username: String!, password: String!): User!
        getMessages(from: String!): [Message]!
    }
    type Mutation {
        register(username: String!, email: String!, password: String!): User!
        sendMessage(content: String!, to: String!): Message!
        reactToMessage(_id: String!, content: String!): Reaction!
    }
    type Subscription {
        newMessage: Message!
        newReaction: Reaction!
    }
`;

export default typeDefs;
