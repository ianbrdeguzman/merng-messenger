import React, { useContext, useEffect } from 'react';
import './home.scss';
import Messages from '../../components/messages/Messages';
import Users from '../../components/users/Users';
import { useLazyQuery, useSubscription } from '@apollo/client';
import { MessageContext } from '../../context/messageContext';
import { UserContext } from '../../context/userContext';
import { NEW_MESSAGE, NEW_REACTION } from '../../apollo/subscription';
import { GET_USERS } from '../../apollo/query';
import { AuthContext } from '../../context/authContext';

const Home = () => {
    const { data: newMessage } = useSubscription(NEW_MESSAGE);
    const { data: newReaction } = useSubscription(NEW_REACTION);

    const { dispatch: messageDispatch } = useContext(MessageContext);
    const { selectedUser, dispatch: userDispatch } = useContext(UserContext);
    const { user: loggedUser } = useContext(AuthContext);

    const [getUsers, { data: users }] = useLazyQuery(GET_USERS, {
        onCompleted: () => {
            userDispatch({ type: 'GET_USERS', payload: users.users });
        },
        fetchPolicy: 'no-cache',
        onError: (error) => console.log(error),
    });

    useEffect(() => {
        if (newMessage && selectedUser) {
            if (
                newMessage.newMessage.from === selectedUser.username &&
                newMessage.newMessage.to === loggedUser.username
            ) {
                messageDispatch({
                    type: 'ADD_MESSAGE',
                    payload: newMessage.newMessage,
                });
            }
        }
        if (newReaction) {
            messageDispatch({
                type: 'ADD_REACTION',
                payload: newReaction.newReaction,
            });
        }
        getUsers();
    }, [
        newMessage,
        newReaction,
        getUsers,
        loggedUser,
        selectedUser,
        messageDispatch,
        userDispatch,
    ]);

    return (
        <div className='home'>
            <div className='home__content'>
                <Users />
                <Messages />
            </div>
        </div>
    );
};

export default Home;
