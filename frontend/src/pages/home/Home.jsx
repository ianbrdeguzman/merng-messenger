import React, { useContext } from 'react';
import { UserContext } from '../../context/userContext';

const Home = ({ history }) => {
    const { dispatch } = useContext(UserContext);

    const handleLogoutOnClick = () => {
        dispatch({ type: 'USER_LOGOUT' });
        history.push('/login');
    };

    return (
        <div>
            <button onClick={handleLogoutOnClick}>Logout</button>
        </div>
    );
};

export default Home;
