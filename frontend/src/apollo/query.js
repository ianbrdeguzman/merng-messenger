import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    query ($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            username
            email
            token
            createdAt
        }
    }
`;

export const GET_USERS = gql`
    query {
        users {
            username
            email
            createdAt
        }
    }
`;
