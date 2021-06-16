import { ApolloServer } from 'apollo-server';
import typeDefs from './graphql/typeDef.js';
import resolvers from './graphql/resolvers.js';
import connectMongoose from './mongoose.js';

const server = new ApolloServer({ typeDefs, resolvers });

await connectMongoose();

server.listen().then(({ url }) => {
    console.log(`Apollo server ready at ${url}`);
});
