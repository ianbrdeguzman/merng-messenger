import User from '../../mongoose/models/userModel.js';
import Message from '../../mongoose/models/messageModel.js';
import {
    ApolloError,
    UserInputError,
    AuthenticationError,
} from 'apollo-server-errors';

const messageResolvers = {
    Query: {
        getMessages: async (_, { from }, { user }) => {
            try {
                if (!user) throw new AuthenticationError('Invalid Token.');

                const sender = await User.findOne({ username: from });
                console.log(sender);

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
        sendMessage: async (_, { content, to }, { user }) => {
            try {
                if (!user) throw new AuthenticationError('Invalid Token.');

                const recipient = await User.findOne({ username: to });

                if (!recipient) throw new UserInputError('Username not found.');
                if (recipient.username === user.username)
                    throw new UserInputError("You can't message yourself.");

                const message = new Message({
                    from: user.username,
                    to,
                    content,
                });

                return message.save();
            } catch (error) {
                console.log(error);
                throw new ApolloError(error.message);
            }
        },
    },
};

export default messageResolvers;
