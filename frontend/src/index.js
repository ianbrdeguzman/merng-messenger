import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { ApolloProvider } from '@apollo/client';
import client from './apollo/client';
import { AuthContextProvider } from './context/authContext';
import { MessageContextProvider } from './context/messageContext';
import { UserContextProvider } from './context/userContext';

ReactDOM.render(
    <ApolloProvider client={client}>
        <AuthContextProvider>
            <MessageContextProvider>
                <UserContextProvider>
                    <App />
                </UserContextProvider>
            </MessageContextProvider>
        </AuthContextProvider>
    </ApolloProvider>,
    document.getElementById('root')
);
