import User from '../../mongoose/models/userModel.js';
import Message from '../../mongoose/models/messageModel.js';
import bcrypt from 'bcryptjs';
import {
    ApolloError,
    UserInputError,
    AuthenticationError,
} from 'apollo-server-errors';
import { generateToken } from '../../utils/utils.js';

const userResolvers = {
    Query: {
        users: async (_, __, { user }) => {
            try {
                if (!user) throw new AuthenticationError('Invalid Token.');

                const users = await User.find({
                    username: { $ne: user.username },
                });

                const allUserMessage = await Message.find({
                    $or: [{ from: user.username }, { to: user.username }],
                }).sort({ createdAt: 'desc' });

                users.map((otherUser) => {
                    const latestMessage = allUserMessage.find(
                        (message) =>
                            message.from === otherUser.username ||
                            message.to === otherUser.username
                    );
                    otherUser.latestMessage = latestMessage;
                });

                return users;
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
                        createdAt: user.createdAt,
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
                    imageUrl: `https://i.pravatar.cc/150?u=${username}`,
                });

                return user.save();
            } catch (error) {
                throw new ApolloError(error.message);
            }
        },
    },
};

export default userResolvers;
