import React, { createContext, useReducer } from 'react';
import jwtDecode from 'jwt-decode';

const UserContext = createContext();

const initialState = {
    user: null,
};

const token = sessionStorage.getItem('token');
if (token) {
    const decodedToken = jwtDecode(token);
    const tokenExpiresAt = new Date(decodedToken.exp * 1000);
    if (new Date() > tokenExpiresAt) {
        sessionStorage.removeItem('token');
    } else {
        initialState.user = decodedToken;
    }
}

const userReducer = (state, action) => {
    switch (action.type) {
        case 'USER_LOGIN': {
            sessionStorage.setItem('token', action.payload.token);
            return {
                ...state,
                user: action.payload,
            };
        }
        case 'USER_LOGOUT': {
            sessionStorage.removeItem('token');
            return {
                ...state,
                user: null,
            };
        }
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
