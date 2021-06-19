import React, { useContext } from 'react';
import './header.scss';
import { AuthContext } from '../../context/authContext';
import { MessageContext } from '../../context/messageContext';
import { UserContext } from '../../context/userContext';
import { HiOutlineLogout } from 'react-icons/hi';
import useShow from '../../hooks/useShow';

const Header = () => {
    const { show } = useShow();

    const { user, dispatch: authDispatch } = useContext(AuthContext);
    const { dispatch: messageDispatch } = useContext(MessageContext);
    const { dispatch: userDispatch } = useContext(UserContext);

    const handleUserLogoutOnClick = () => {
        authDispatch({ type: 'USER_LOGOUT' });
        userDispatch({ type: 'RESET_USER' });
        messageDispatch({ type: 'RESET_MESSAGES' });
    };

    return (
        <header className='header'>
            {show && (
                <>
                    <img src={user.imageUrl} alt={`${user.username}-avatar`} />
                    <h1>Chats</h1>
                </>
            )}
            <button onClick={handleUserLogoutOnClick}>
                <HiOutlineLogout />
            </button>
        </header>
    );
};

export default Header;
