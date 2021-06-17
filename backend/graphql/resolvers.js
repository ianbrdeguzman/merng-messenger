import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import {
    ApolloError,
    UserInputError,
    AuthenticationError,
} from 'apollo-server-errors';
import { generateToken, authenticateToken } from '../utils.js';

const resolvers = {
    Query: {
        users: async (_, __, context) => {
            try {
                if (context.req && context.req.headers.authorization) {
                    const token =
                        context.req.headers.authorization.split('Bearer ')[1];

                    const { _id } = authenticateToken(token);

                    if (_id) {
                        const users = await User.find({ _id: { $ne: _id } });
                        return users;
                    }
                } else {
                    throw new AuthenticationError('No token Found.');
                }
            } catch (error) {
                throw new ApolloError(error.message);
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
                        throw new AuthenticationError('Incorrect password.');

                    return {
                        ...user.toJSON(),
                        createdAt: user.createdAt.toISOString(),
                        token: generateToken(JSON.parse(JSON.stringify(user))),
                    };
                } else {
                    if (!user) throw new UserInputError('Username not found.');
                }
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

                if (userByUsername)
                    throw new UserInputError('Username already taken.');
                if (userByEmail)
                    throw new UserInputError('Email address already taken.');

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
