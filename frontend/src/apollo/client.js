import {
    ApolloClient,
    createHttpLink,
    InMemoryCache,
    split,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

let httpLink = createHttpLink({
    uri: 'https://rocky-citadel-34216.herokuapp.com/', // http://localhost:4000/
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

httpLink = authLink.concat(httpLink);

export const wsLink = new WebSocketLink({
    uri: 'wss://rocky-citadel-34216.herokuapp.com/graphql', // 'ws://localhost:4000/graphql'
    options: {
        reconnect: true,
        lazy: true,
        connectionParams: () => ({
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }),
    },
});

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink
);

const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
});

export default client;
