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

export const REACT_TO_MESSAGE = gql`
    mutation ($_id: String!, $content: String!) {
        reactToMessage(_id: $_id, content: $content) {
            _id
            content
            message {
                _id
            }
        }
    }
`;
