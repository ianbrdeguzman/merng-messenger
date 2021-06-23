import React, { useContext, useState } from 'react';
import './reactions.scss';
import { AuthContext } from '../../context/authContext';
import useShow from '../../hooks/useShow';
import { FiSmile } from 'react-icons/fi';
const reactions = ['❤️', '😆', '😯', '😢', '😡', '👍', '👎'];

const Reactions = ({ user, id, position }) => {
    const [showReactions, setShowReactions] = useState(false);
    const { show } = useShow();

    const {
        user: { username: loggedUser },
    } = useContext(AuthContext);

    const handleReactionOnClick = (content) => {
        console.log(`Message Id: ${id}, Content: ${content}`);
    };

    return (
        user === loggedUser && (
            <div className='reactions'>
                <button onClick={() => setShowReactions(!showReactions)}>
                    <FiSmile />
                </button>
                {showReactions && (
                    <ul
                        className={`${!show ? 'small' : null} ${
                            position === 'right' ? 'right' : 'left'
                        }`}
                    >
                        {reactions.map((reaction, i) => {
                            return (
                                <li
                                    key={i}
                                    onClick={() =>
                                        handleReactionOnClick(reaction)
                                    }
                                >
                                    {reaction}
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        )
    );
};

export default Reactions;
