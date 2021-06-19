import React, { createContext, useReducer } from 'react';

const UserContext = createContext();

const initialState = {
    users: [],
    selectedUser: null,
};

const userReducer = (state, action) => {
    switch (action.type) {
        case 'GET_USERS':
            return { ...state, users: action.payload };
        case 'SELECT_USER':
            return { ...state, selectedUser: action.payload };
        case 'RESET_USER':
            return { ...state, users: [], selectedUser: null };
        default:
            return { ...state };
    }
};

const UserContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);

    return (
        <UserContext.Provider value={{ ...state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserContextProvider };
