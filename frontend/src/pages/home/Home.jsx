import React, { useContext, useState } from 'react';
import './home.scss';
import Messages from '../../components/messages/Messages';
import { useLazyQuery } from '@apollo/client';
import { GET_MESSAGES } from '../../apollo/query';
import { MessageContext } from '../../context/messageContext';
import Conversations from '../../components/conversations/Conversations';

const Home = () => {
    const [error, setError] = useState(null);

    const { conversations, dispatch: messageDispatch } =
        useContext(MessageContext);

    const [getMessages, { loading }] = useLazyQuery(GET_MESSAGES, {
        onCompleted: (data) => {
            messageDispatch({
                type: 'GET_MESSAGES',
                payload: data.getMessages,
            });
        },
        onError: (error) => setError(error.message),
    });

    return (
        <div className='home'>
            <div className='home__content'>
                <Messages getMessages={getMessages} />
                <Conversations loading={loading} />
            </div>
        </div>
    );
};

export default Home;
