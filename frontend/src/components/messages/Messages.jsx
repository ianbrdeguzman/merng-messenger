import React, { useContext, useEffect } from 'react';
import './messages.scss';
import Loader from '../loader/Loader';
import Message from '../message/Message';
import Form from '../form/Form';
import MessagesHeader from '../header/MessagesHeader';
import { MessageContext } from '../../context/messageContext';
import { UserContext } from '../../context/userContext';
import { useLazyQuery } from '@apollo/client';
import { GET_MESSAGES } from '../../apollo/query';

const Messages = () => {
    const { messages, dispatch: messageDispatch } = useContext(MessageContext);

    const { selectedUser } = useContext(UserContext);

    const [getMessages, { loading }] = useLazyQuery(GET_MESSAGES, {
        onCompleted: (data) => {
            messageDispatch({
                type: 'GET_MESSAGES',
                payload: data.getMessages,
            });
        },
        fetchPolicy: 'no-cache',
    });

    useEffect(() => {
        if (selectedUser) {
            getMessages({
                variables: {
                    from: selectedUser.username,
                },
            });
        }
    }, [selectedUser, getMessages]);

    return (
        <div className='messages'>
            <MessagesHeader />
            <main className='messages__main'>
                {loading ? (
                    <div className='messages__main__loader'>
                        <Loader />
                    </div>
                ) : (
                    <div className='messages__main__content'>
                        {selectedUser &&
                            messages?.map((message) => {
                                return (
                                    <Message key={message._id} {...message} />
                                );
                            })}
                    </div>
                )}
            </main>
            <Form />
        </div>
    );
};

export default Messages;
