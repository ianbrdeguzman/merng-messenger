import React, { useContext, useEffect, useState } from 'react';
import './conversations.scss';
import { MessageContext } from '../../context/messageContext';
import { UserContext } from '../../context/userContext';
import { MdSend } from 'react-icons/md';
import Loader from '../loader/Loader';
import { AuthContext } from '../../context/authContext';

const Conversations = ({ loading }) => {
    const [selectedUserDetails, setSelectedUserDetails] = useState({});

    const { conversations } = useContext(MessageContext);
    const { users, selectedUser } = useContext(UserContext);
    const {
        user: { username: loggedUser },
    } = useContext(AuthContext);

    useEffect(() => {
        const userDetails = users.find(
            (user) => selectedUser === user.username
        );
        setSelectedUserDetails(userDetails);
    }, [selectedUser, setSelectedUserDetails, users]);

    return (
        <div className='conversation'>
            <header className='conversation__header'>
                {selectedUser && (
                    <>
                        <img
                            src={selectedUserDetails?.imageUrl}
                            alt={selectedUserDetails?.username}
                        />
                        <div>
                            <p>{selectedUserDetails?.username}</p>
                            <p>Active 5mins ago</p>
                        </div>
                    </>
                )}
            </header>
            <main className='conversation__main'>
                {loading ? (
                    <div className='conversation__main__loader'>
                        <Loader />
                    </div>
                ) : (
                    <div className='conversation__main__content'>
                        {conversations.map(
                            ({ from, to, _id, content, createdAt }) => {
                                return (
                                    <div
                                        key={_id}
                                        className={`conversation__main__content__item ${
                                            from === loggedUser
                                                ? 'right'
                                                : 'left'
                                        }`}
                                    >
                                        <span>{content}</span>
                                    </div>
                                );
                            }
                        )}
                    </div>
                )}
            </main>
            <footer className='conversation__footer'>
                <form>
                    <input type='text' name='text' id='text' />
                    <button type='submit'>
                        <MdSend size={20} color='#0099ff' />
                    </button>
                </form>
            </footer>
        </div>
    );
};

export default Conversations;
