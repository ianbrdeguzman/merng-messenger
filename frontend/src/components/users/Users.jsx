import React, { useContext, useEffect } from 'react';
import './users.scss';
import Header from '../header/Header';
import { useQuery } from '@apollo/client';
import { GET_USERS } from '../../apollo/query';
import { UserContext } from '../../context/userContext';
import moment from 'moment';
import useShow from '../../hooks/useShow';
import useSort from '../../hooks/useSort'

const Users = () => {
    const { show } = useShow();
    const [sortedUsers, sortUsers] = useSort();

    const {
        users,
        selectedUser,
        dispatch: userDispatch,
    } = useContext(UserContext);

    const { loading, data } = useQuery(GET_USERS, {
        onCompleted: () => {
            userDispatch({ type: 'GET_USERS', payload: data.users });
        },
        fetchPolicy: 'no-cache',
    });

    useEffect(()=>{
        if(users) {
            sortUsers(users);
        }
    },[users])

    return (
        <div className='users'>
            <Header />
            <ul className='users__items'>
                {loading ? <h1>Loading...</h1> : sortedUsers.length > 0 &&
                    sortedUsers.map((user) => {
                        const { username, imageUrl, createdAt } = user;
                        return (
                            <li
                                className={
                                    selectedUser?.username === username
                                        ? 'selected'
                                        : null
                                }
                                key={username}
                                onClick={() =>
                                    userDispatch({
                                        type: 'SELECT_USER',
                                        payload: user,
                                    })
                                }
                            >
                                <img
                                    src={imageUrl}
                                    alt={`${username}-avatar`}
                                />
                                {show && (
                                    <>
                                        <div>
                                            <p>{username}</p>
                                            {user.latestMessage ? <p>{user.latestMessage?.content}</p> : <p>No messages</p>}
                                        </div>
                                        {user.latestMessage ? <p>
                                            {moment(
                                                +user.latestMessage?.createdAt
                                            ).fromNow()}
                                        </p> : <p>{moment(+createdAt).fromNow()}</p>}
                                    </>
                                )}
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
};

export default Users;
