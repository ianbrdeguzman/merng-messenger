import React, { useContext } from 'react';
import './messagesHeader.scss';
import { UserContext } from '../../context/userContext';
import moment from 'moment';

const MessagesHeader = () => {
    const { selectedUser } = useContext(UserContext);

    return (
        <header className='messages__header'>
            {selectedUser && (
                <>
                    <img
                        src={selectedUser?.imageUrl}
                        alt={selectedUser?.username}
                    />
                    <div>
                        <p>{selectedUser?.username}</p>
                        <p>
                            Active{' '}
                            {moment(
                                +selectedUser?.latestMessage.createdAt
                            ).fromNow()}
                        </p>
                    </div>
                </>
            )}
        </header>
    );
};

export default MessagesHeader;
