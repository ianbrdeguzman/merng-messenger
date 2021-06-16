import { users } from '../data.js';

const resolvers = {
    Query: {
        users: () => users,
    },
};

export default resolvers;
