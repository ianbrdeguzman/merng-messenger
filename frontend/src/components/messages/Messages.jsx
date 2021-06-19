import React, { useContext } from 'react';
import './messages.scss';
import { useQuery } from '@apollo/client';
import { AuthContext } from '../../context/authContext';
import { HiOutlineLogout } from 'react-icons/hi';
import moment from 'moment';
import { GET_USERS } from '../../apollo/query';
import { UserContext } from '../../context/userContext';
import { MessageContext } from '../../context/messageContext';

const Messages = ({ getMessages }) => {
    const { user: loggedUser, dispatch: authDispatch } =
        useContext(AuthContext);

    const { dispatch: messageDispatch } = useContext(MessageContext);

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

    const handleSelectedUserOnClick = (username) => {
        userDispatch({ type: 'SELECT_USER', payload: username });
        getMessages({
            variables: {
                from: username,
            },
        });
    };

    const handleUserLogoutOnClick = () => {
        authDispatch({ type: 'USER_LOGOUT' });
        userDispatch({ type: 'RESET_USER' });
        messageDispatch({ type: 'RESET_MESSAGES' });
    };

    return (
        <div className='messages'>
            <header className='messages__header'>
                <img
                    src={loggedUser.imageUrl}
                    alt={`${loggedUser.username}-avatar`}
                />
                <h1>Chats</h1>
                <button onClick={handleUserLogoutOnClick}>
                    <HiOutlineLogout />
                </button>
            </header>
            <ul className='messages__items'>
                {users.length !== 0 &&
                    users.map(({ username, imageUrl, latestMessage }) => {
                        return (
                            <li
                                className={
                                    selectedUser === username
                                        ? 'selected'
                                        : null
                                }
                                key={username}
                                onClick={() =>
                                    handleSelectedUserOnClick(username)
                                }
                            >
                                <img
                                    src={imageUrl}
                                    alt={`${username}-avatar`}
                                />
                                <div>
                                    <p>{username}</p>
                                    <p>{latestMessage.content}</p>
                                </div>
                                <p>
                                    {moment(+latestMessage.createdAt).fromNow()}
                                </p>
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
};

export default Messages;
