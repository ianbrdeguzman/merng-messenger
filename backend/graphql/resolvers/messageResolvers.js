import User from '../../mongoose/models/userModel.js';
import Message from '../../mongoose/models/messageModel.js';
import Reaction from '../../mongoose/models/reactionModel.js';
import {
    ApolloError,
    UserInputError,
    AuthenticationError,
    ForbiddenError,
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
        reactToMessage: async (_, {_id, content}, {user, pubsub}) => {
            const reactions = ['❤️', '😆', '😯', '😢', '😡', '👍', '👎']
            try {
                if(!reactions.includes(content)) throw new UserInputError('Invalid reaction.')

                const username = user ? user.username : '';
                user = await User.findOne({username : username})
                if (!user) throw new AuthenticationError('Invalid token.');

                const message = await Message.findOne({_id: _id})
                
                if (!message) throw new UserInputError('Invalid message.');

                if (message.from !== user.username && message.to !== user.username) throw new ForbiddenError('Unauthorized message.')

                let reaction = await Reaction.findOne({
                    $and: [
                        {messageId: _id}, 
                        {userId: user._id}
                    ]
                })

                if (reaction) {
                    reaction.content = content;
                    await reaction.save();
                } else {
                    reaction = await Reaction.create({
                        content: content,
                        userId: user._id,
                        messageId: message._id,
                    })
                }

                reaction.message = message;
                reaction.user = user;

                pubsub.publish('NEW_REACTION', { newReaction: reaction });

                return reaction;
            } catch (error) {
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
                        return pubsub.asyncIterator('NEW_MESSAGE');
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
        newReaction: {
            subscribe: withFilter(
                (_, __, { pubsub, user }) => {
                    try {
                        if (!user)
                            throw new AuthenticationError('Invalid Token.');
                        return pubsub.asyncIterator('NEW_REACTION');
                    } catch (error) {
                        console.log(error);
                        throw new ApolloError(error.message);
                    }
                },
                async ({ newReaction }, _, { user }) => {
                    const message = await Message.findOne({_id: newReaction.messageId})
                    if (
                        message.from === user.username ||
                        message.to === user.username
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
