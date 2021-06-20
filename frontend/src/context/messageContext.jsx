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
            return {
                ...state,
                messages: [...state.messages, action.payload],
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
