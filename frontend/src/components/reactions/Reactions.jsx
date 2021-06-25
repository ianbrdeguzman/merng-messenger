import React, { useContext, useState } from 'react';
import './reactions.scss';
import { AuthContext } from '../../context/authContext';
import useShow from '../../hooks/useShow';
import { FiSmile } from 'react-icons/fi';
import { useMutation } from '@apollo/client';
import { REACT_TO_MESSAGE } from '../../apollo/mutation';
import { MessageContext } from '../../context/messageContext';
const reactions = ['❤️', '😆', '😯', '😢', '😡', '👍', '👎'];

const Reactions = ({ user, id, position }) => {
    const [showReactions, setShowReactions] = useState(false);
    const { _, reactionShow } = useShow();

    const { dispatch: messasgeDispatch } = useContext(MessageContext);

    const {
        user: { username: loggedUser },
    } = useContext(AuthContext);

    const [reactToMessage] = useMutation(REACT_TO_MESSAGE, {
        onCompleted: (data) => {
            messasgeDispatch({
                type: 'ADD_REACTION',
                payload: data.reactToMessage,
            });
        },
        onError: (error) => console.log(error),
    });

    const handleReactionOnClick = (content) => {
        reactToMessage({
            variables: {
                _id: id,
                content: content,
            },
        });
    };

    return (
        user === loggedUser && (
            <div className='reactions'>
                <button onClick={() => setShowReactions(!showReactions)}>
                    <FiSmile />
                </button>
                {showReactions && (
                    <ul
                        className={`${!reactionShow ? 'small' : null} ${
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
