import React, { useContext } from 'react';
import './conversations.scss';
import Loader from '../loader/Loader';
import ConversationHeader from '../header/ConversationHeader';
import { MessageContext } from '../../context/messageContext';
import { AuthContext } from '../../context/authContext';
import { MdSend } from 'react-icons/md';
import { UserContext } from '../../context/userContext';

const Conversations = ({ loading }) => {
    const { conversations } = useContext(MessageContext);

    const {
        user: { username: loggedUser },
    } = useContext(AuthContext);

    const { selectedUser } = useContext(UserContext);

    return (
        <div className='conversation'>
            <ConversationHeader />
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
                                        {from !== loggedUser && (
                                            <img
                                                src={selectedUser.imageUrl}
                                                alt={selectedUser.username}
                                            />
                                        )}
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
