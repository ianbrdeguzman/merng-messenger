import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import { ApolloError, UserInputError } from 'apollo-server-errors';

const resolvers = {
    Query: {
        users: () => {
            return User.find({});
        },
    },
    Mutation: {
        register: async (_, { username, email, password }) => {
            try {
                const userByEmail = await User.findOne({ email });
                const userByUsername = await User.findOne({ username });

                if (userByEmail)
                    throw new UserInputError('Email address already taken.');
                if (userByUsername)
                    throw new UserInputError('Username already taken.');

                const user = new User({
                    username,
                    email,
                    password: bcrypt.hashSync(password, 8),
                });
                return user.save();
            } catch (error) {
                throw new ApolloError(error.message);
            }
        },
    },
};

export default resolvers;
