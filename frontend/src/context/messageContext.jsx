import React, { createContext, useReducer } from 'react';

const MessageContext = createContext();

const initialState = {
    conversations: [],
};

const messageReducer = (state, action) => {
    switch (action.type) {
        case 'GET_MESSAGES':
            return { ...state, conversations: action.payload };
        case 'RESET_MESSAGES':
            return { ...state, conversations: [] };
        case 'ADD_MESSAGE':
            return {
                ...state,
                conversations: [...state.conversations, action.payload],
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
