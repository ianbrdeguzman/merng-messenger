import User from '../../mongoose/models/userModel.js';
import Message from '../../mongoose/models/messageModel.js';
import {
    ApolloError,
    UserInputError,
    AuthenticationError,
} from 'apollo-server-errors';
import { withFilter } from 'apollo-server';

const messageResolvers = {
    Query: {
        getMessages: async (_, { from }, { user }) => {
            try {
                if (!user) throw new AuthenticationError('Invalid Token.');

                const sender = await User.findOne({ username: from });

                if (!sender) throw new UserInputError('User not found.');

                const messages = await Message.find({
                    $or: [
                        {
                            $and: [
                                { from: sender.username },
                                { to: user.username },
                            ],
                        },
                        {
                            $and: [
                                { from: user.username },
                                { to: sender.username },
                            ],
                        },
                    ],
                }).sort({ createdAt: 'asc' });

                return messages;
            } catch (error) {
                throw new ApolloError(error.message);
            }
        },
    },
    Mutation: {
        sendMessage: async (_, { content, to }, { user, pubsub }) => {
            try {
                if (!user) throw new AuthenticationError('Invalid Token.');

                const recipient = await User.findOne({ username: to });

                if (!recipient) throw new UserInputError('Username not found.');
                if (recipient.username === user.username)
                    throw new UserInputError("You can't message yourself.");

                const message = await new Message({
                    from: user.username,
                    to,
                    content,
                });

                const createdMessage = await message.save();

                pubsub.publish('NEW_MESSAGE', { newMessage: createdMessage });

                return createdMessage;
            } catch (error) {
                console.log(error);
                throw new ApolloError(error.message);
            }
        },
    },
    Subscription: {
        newMessage: {
            subscribe: withFilter(
                (_, __, { pubsub, user }) => {
                    try {
                        if (!user)
                            throw new AuthenticationError('Invalid Token.');
                        return pubsub.asyncIterator(['NEW_MESSAGE']);
                    } catch (error) {
                        console.log(error);
                        throw new ApolloError(error.message);
                    }
                },
                ({ newMessage }, _, { user }) => {
                    if (
                        newMessage.from === user.username ||
                        newMessage.to === user.username
                    ) {
                        return true;
                    }
                    return false;
                }
            ),
        },
    },
};

export default messageResolvers;
