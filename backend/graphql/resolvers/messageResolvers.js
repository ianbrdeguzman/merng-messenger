import User from '../../models/userModel.js';
import Message from '../../models/messageModel.js';
import {
    ApolloError,
    UserInputError,
    AuthenticationError,
} from 'apollo-server-errors';

const messageResolvers = {
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
