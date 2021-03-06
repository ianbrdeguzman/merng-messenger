import userResolvers from './userResolvers.js';
import messageResolvers from './messageResolvers.js';

const resolvers = {
    Query: {
        ...userResolvers.Query,
        ...messageResolvers.Query,
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...messageResolvers.Mutation,
    },
    Subscription: {
        ...messageResolvers.Subscription,
    },
};

export default resolvers;
