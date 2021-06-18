import React, { useContext } from 'react';
import { UserContext } from '../../context/userContext';

const Home = () => {
    const { dispatch } = useContext(UserContext);

    const handleLogoutOnClick = () => {
        dispatch({ type: 'USER_LOGOUT' });
    };

    return (
        <div>
            <button onClick={handleLogoutOnClick}>Logout</button>
        </div>
    );
};

export default Home;
