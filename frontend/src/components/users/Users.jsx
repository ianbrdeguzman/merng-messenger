import React, { useContext, useState } from 'react';
import moment from 'moment';
import { GET_MESSAGES } from '../../apollo/query';
import { MessageContext } from '../../context/messageContext';
import { useLazyQuery } from '@apollo/client';

const Users = ({ users }) => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [error, setError] = useState(null);

    const { dispatch } = useContext(MessageContext);

    console.log(selectedUser);

    const [getMessages, { loading }] = useLazyQuery(GET_MESSAGES, {
        onCompleted: (data) => {
            dispatch({ type: 'GET_MESSAGES', payload: data.login });
        },
        onError: (error) => setError(error.message),
    });

    return (
        <ul className='home__content__left__users'>
            {users?.users.map(({ username, imageUrl, latestMessage }) => {
                return (
                    <li
                        key={username}
                        onClick={() => setSelectedUser(username)}
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
    );
};

export default Users;
