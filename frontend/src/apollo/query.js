import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    query ($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            username
            email
            token
            createdAt
            imageUrl
        }
    }
`;

export const GET_USERS = gql`
    query {
        users {
            username
            createdAt
            imageUrl
            latestMessage {
                content
                from
                to
                createdAt
            }
        }
    }
`;

export const GET_MESSAGES = gql`
    query ($from: String!) {
        getMessages(from: $from) {
            _id
            from
            to
            content
            createdAt
        }
    }
`;
