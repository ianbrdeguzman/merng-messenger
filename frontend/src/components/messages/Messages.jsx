import React, { useContext, useState } from 'react';
import './messages.scss';
import { useQuery } from '@apollo/client';
import { AuthContext } from '../../context/authContext';
import { HiOutlineLogout } from 'react-icons/hi';
import moment from 'moment';
import { GET_USERS } from '../../apollo/query';
import { UserContext } from '../../context/userContext';

const Messages = ({ getMessages }) => {
    const [error, setError] = useState(null);

    const { user: loggedUser, dispatch: authDispatch } =
        useContext(AuthContext);

    const { selectedUser, dispatch: userDispatch } = useContext(UserContext);

    const { data: users } = useQuery(GET_USERS, {
        onCompleted: () => {
            userDispatch({ type: 'GET_USERS', payload: users.users });
        },
        onError: (error) => setError(error.message),
    });

    const handleSelectedUserOnClick = (username) => {
        userDispatch({ type: 'SELECT_USER', payload: username });
        getMessages({
            variables: {
                from: username,
            },
        });
    };

    return (
        <div className='messages'>
            <header className='messages__header'>
                <img
                    src={loggedUser.imageUrl}
                    alt={`${loggedUser.username}-avatar`}
                />
                <h1>Chats</h1>
                <button onClick={() => authDispatch({ type: 'USER_LOGOUT' })}>
                    <HiOutlineLogout />
                </button>
            </header>
            <ul className='messages__items'>
                {users?.users.map(({ username, imageUrl, latestMessage }) => {
                    return (
                        <li
                            className={
                                selectedUser === username ? 'selected' : null
                            }
                            key={username}
                            onClick={() => handleSelectedUserOnClick(username)}
                        >
                            <img src={imageUrl} alt={`${username}-avatar`} />
                            <div>
                                <p>{username}</p>
                                <p>{latestMessage.content}</p>
                            </div>
                            <p>{moment(+latestMessage.createdAt).fromNow()}</p>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Messages;
