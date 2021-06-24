import { gql } from '@apollo/client';

export const NEW_MESSAGE = gql`
    subscription {
        newMessage {
            createdAt
            to
            from
            content
            _id
        }
    }
`;

export const NEW_REACTION = gql`
    subscription {
        newReaction {
            _id
            content
            message {
                _id
            }
        }
    }
`;
