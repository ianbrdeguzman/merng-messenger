import React, { createContext, useReducer } from 'react';
import jwtDecode from 'jwt-decode';

const AuthContext = createContext();

const initialState = {
    user: null,
};

const token = localStorage.getItem('token');
if (token) {
    const decodedToken = jwtDecode(token);
    const tokenExpiresAt = new Date(decodedToken.exp * 1000);
    if (new Date() > tokenExpiresAt) {
        localStorage.removeItem('token');
    } else {
        initialState.user = decodedToken;
    }
}

const authReducer = (state, action) => {
    switch (action.type) {
        case 'USER_LOGIN': {
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                user: action.payload,
            };
        }
        case 'USER_LOGOUT': {
            localStorage.removeItem('token');
            return {
                ...state,
                user: null,
            };
        }
        default:
            return { ...state };
    }
};

const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthContextProvider };
