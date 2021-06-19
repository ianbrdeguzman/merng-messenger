import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { ApolloProvider } from '@apollo/client';
import client from './apollo/client';
import { UserContextProvider } from './context/userContext';
import { MessageContextProvider } from './context/messageContext';

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <UserContextProvider>
                <MessageContextProvider>
                    <App />
                </MessageContextProvider>
            </UserContextProvider>
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
