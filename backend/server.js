import { ApolloServer } from 'apollo-server';
import typeDefs from './graphql/typeDef.js';
import resolvers from './graphql/resolvers/index.js';
import connectMongoose from './mongoose/mongoose.js';
import { isAuthenticated } from './utils/utils.js';

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: isAuthenticated,
});

await connectMongoose();

server.listen().then(({ url }) => {
    console.log(`Apollo server ready at ${url}`);
});
