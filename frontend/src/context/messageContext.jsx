import React, { createContext, useReducer } from 'react';

const MessageContext = createContext();

const initialState = {
    messages: [],
};

const messageReducer = (state, action) => {
    switch (action.type) {
        case 'GET_MESSAGES':
            return { ...state, messages: action.payload };
        case 'RESET_MESSAGES':
            return { ...state, messages: [] };
        case 'ADD_MESSAGE':
            let newMessage = action.payload;
            if (!action.payload.reactions) {
                newMessage.reactions = [];
            }
            return {
                ...state,
                messages: [...state.messages, newMessage],
            };
        case 'ADD_REACTION':
            // make a copy of messages
            const copyOfMessages = [...state.messages];

            // find the reacted message
            const reactedMessage = copyOfMessages.find(
                (message) => message._id === action.payload.message._id
            );

            // find the reaction in reacted message
            let reactionOnMessage;
            if (reactedMessage?.reactions) {
                reactionOnMessage = reactedMessage.reactions.find(
                    (reaction) => reaction._id === action.payload._id
                );
            }

            // if reaction is found in reacted message
            if (reactionOnMessage) {
                // update reaction content
                reactionOnMessage.content = action.payload.content;
            } else {
                // else add new reaction to reacted message
                if (reactedMessage) {
                    reactedMessage.reactions = [
                        ...reactedMessage?.reactions,
                        {
                            content: action.payload.content,
                            _id: action.payload._id,
                        },
                    ];
                }
            }
            // return state with reacted message
            return {
                ...state,
                messages: copyOfMessages,
            };
        default:
            return { ...state };
    }
};

const MessageContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(messageReducer, initialState);
    return (
        <MessageContext.Provider value={{ ...state, dispatch }}>
            {children}
        </MessageContext.Provider>
    );
};

export { MessageContext, MessageContextProvider };
