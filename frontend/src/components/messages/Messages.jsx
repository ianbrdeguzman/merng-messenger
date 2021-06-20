import React, { useContext, useEffect } from 'react';
import './messages.scss';
import Loader from '../loader/Loader';
import Form from '../form/Form';
import MessagesHeader from '../header/MessagesHeader';
import { MessageContext } from '../../context/messageContext';
import { AuthContext } from '../../context/authContext';
import { UserContext } from '../../context/userContext';
import { useLazyQuery, useSubscription } from '@apollo/client';
import { NEW_MESSAGE } from '../../apollo/subscription';
import { GET_MESSAGES } from '../../apollo/query';

const Messages = () => {
    const { messages, dispatch: messageDispatch } = useContext(MessageContext);

    const {
        user: { username: loggedUser },
    } = useContext(AuthContext);

    const { selectedUser } = useContext(UserContext);

    const [getMessages, { loading }] = useLazyQuery(GET_MESSAGES, {
        onCompleted: (data) => {
            messageDispatch({
                type: 'GET_MESSAGES',
                payload: data.getMessages,
            });
        },
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
                            messages?.map(
                                ({ from, to, _id, content, createdAt }) => {
                                    return (
                                        <div
                                            key={_id}
                                            className={`messages__main__content__item ${
                                                from === loggedUser
                                                    ? 'right'
                                                    : 'left'
                                            }`}
                                        >
                                            {from !== loggedUser && (
                                                <img
                                                    src={selectedUser?.imageUrl}
                                                    alt={selectedUser?.username}
                                                />
                                            )}
                                            <span>{content}</span>
                                        </div>
                                    );
                                }
                            )}
                    </div>
                )}
            </main>
            <Form />
        </div>
    );
};

export default Messages;
