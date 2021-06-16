import { ApolloServer } from 'apollo-server';
import typeDefs from './typeDef/typeDef.js';
import resolvers from './resolvers/resolvers.js';

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
