import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import {
    ApolloError,
    UserInputError,
    AuthenticationError,
} from 'apollo-server-errors';

const resolvers = {
    Query: {
        users: async () => {
            try {
                const users = await User.find({});
                return users;
            } catch (error) {
                console.log(error);
            }
        },
        login: async (_, { username, password }) => {
            try {
                const user = await User.findOne({ username });

                if (user) {
                    const correctPassword = bcrypt.compareSync(
                        password,
                        user.password
                    );

                    if (!correctPassword)
                        throw new AuthenticationError('Password is incorrect.');

                    return user;
                } else {
                    if (!user) throw new UserInputError('Username not found.');
                }

                return user;
            } catch (error) {
                throw new ApolloError(error.message);
            }
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
