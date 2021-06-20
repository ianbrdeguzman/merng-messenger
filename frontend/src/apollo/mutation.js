import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
    mutation ($username: String!, $email: String!, $password: String!) {
        register(username: $username, email: $email, password: $password) {
            username
            email
            createdAt
        }
    }
`;

export const SEND_MESSAGE = gql`
    mutation ($content: String!, $to: String!) {
        sendMessage(content: $content, to: $to) {
            _id
            content
            to
            from
            createdAt
        }
    }
`;
