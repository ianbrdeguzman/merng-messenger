import React, { useContext } from 'react';
import './conversationHeader.scss';
import { UserContext } from '../../context/userContext';
import moment from 'moment';

const ConversationHeader = () => {
    const { selectedUser } = useContext(UserContext);

    return (
        <header className='conversation__header'>
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

export default ConversationHeader;
