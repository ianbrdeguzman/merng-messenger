import React, { useContext, useEffect, useState } from 'react';
import { MessageContext } from '../../context/messageContext';
import { UserContext } from '../../context/userContext';
import './conversations.scss';
import { MdSend } from 'react-icons/md';

const Conversations = ({ loading }) => {
    const [selectedUserDetails, setSelectedUserDetails] = useState({});
    const { conversations } = useContext(MessageContext);

    const { users, selectedUser } = useContext(UserContext);

    useEffect(() => {
        const userDetails = users.find(
            (user) => selectedUser === user.username
        );
        setSelectedUserDetails(userDetails);
    }, [selectedUser, setSelectedUserDetails]);

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
                {conversations.map((message) => {
                    console.log(message);
                })}
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
