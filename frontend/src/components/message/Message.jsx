import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import { UserContext } from '../../context/userContext';
import './message.scss';
import moment from 'moment';

const Message = ({ _id, content, createdAt, from }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    const {
        user: { username: loggedUser },
    } = useContext(AuthContext);

    const { selectedUser } = useContext(UserContext);

    return (
        <div
            key={_id}
            className={`message ${from === loggedUser ? 'right' : 'left'}`}
        >
            {from !== loggedUser && (
                <img
                    src={selectedUser?.imageUrl}
                    alt={selectedUser?.username}
                />
            )}
            <p
                onMouseOver={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            >
                {content}
                {showTooltip && (
                    <span>
                        {moment(+createdAt).format('MMMM DD, YYYY @ h:mm a')}
                    </span>
                )}
            </p>
        </div>
    );
};

export default Message;
