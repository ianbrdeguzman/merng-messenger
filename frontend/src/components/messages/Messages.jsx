import React, { useContext } from 'react';
import './messages.scss';
import Header from '../header/Header';
import { useQuery } from '@apollo/client';
import { GET_USERS } from '../../apollo/query';
import { UserContext } from '../../context/userContext';
import moment from 'moment';
import useShow from '../../hooks/useShow';

const Messages = ({ getMessages }) => {
    const { show } = useShow();

    const {
        users,
        selectedUser,
        dispatch: userDispatch,
    } = useContext(UserContext);

    const { data } = useQuery(GET_USERS, {
        onCompleted: () => {
            userDispatch({ type: 'GET_USERS', payload: data.users });
        },
        fetchPolicy: 'no-cache',
    });

    const handleSelectedUserOnClick = (user) => {
        userDispatch({ type: 'SELECT_USER', payload: user });
        getMessages({
            variables: {
                from: user.username,
            },
        });
    };

    return (
        <div className='messages'>
            <Header />
            <ul className='messages__items'>
                {users.length > 0 &&
                    users.map((user) => {
                        const { username, imageUrl, latestMessage } = user;
                        return (
                            <li
                                className={
                                    selectedUser?.username === username
                                        ? 'selected'
                                        : null
                                }
                                key={username}
                                onClick={() => handleSelectedUserOnClick(user)}
                            >
                                <img
                                    src={imageUrl}
                                    alt={`${username}-avatar`}
                                />
                                {show && (
                                    <>
                                        <div>
                                            <p>{username}</p>
                                            <p>{latestMessage.content}</p>
                                        </div>
                                        <p>
                                            {moment(
                                                +latestMessage.createdAt
                                            ).fromNow()}
                                        </p>
                                    </>
                                )}
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
};

export default Messages;
