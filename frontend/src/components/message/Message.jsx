import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import { UserContext } from '../../context/userContext';
import './message.scss';
import moment from 'moment';
import Reactions from '../reactions/Reactions';
import useShow from '../../hooks/useShow';

const Message = ({ _id, content, createdAt, from, to }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [showReaction, setShowReaction] = useState(false);

    const { show } = useShow();

    const {
        user: { username: loggedUser },
    } = useContext(AuthContext);

    const { selectedUser } = useContext(UserContext);

    return (
        <div
            key={_id}
            className={`message ${from === loggedUser ? 'right' : 'left'}`}
            onMouseOver={() => setShowReaction(true)}
            onMouseLeave={() => setShowReaction(false)}
        >
            {from !== loggedUser && (
                <img
                    src={selectedUser?.imageUrl}
                    alt={selectedUser?.username}
                />
            )}
            {showReaction && (
                <Reactions
                    user={from}
                    id={_id}
                    position={from === loggedUser ? 'right' : 'left'}
                />
            )}
            <p
                onMouseOver={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            >
                {content}
                {showTooltip && show && (
                    <span className='message__tooltip'>
                        {moment(+createdAt).format('MMMM DD, YYYY @ h:mm a')}
                    </span>
                )}
            </p>
            {showReaction && <Reactions user={to} id={_id} />}
        </div>
    );
};

export default Message;
