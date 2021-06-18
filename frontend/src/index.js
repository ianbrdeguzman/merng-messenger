import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { ApolloProvider } from '@apollo/client';
import client from './apollo/client';
import { UserContextProvider } from './context/userContext';

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <UserContextProvider>
                <App />
            </UserContextProvider>
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
