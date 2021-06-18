import React, { useContext } from 'react';
import './home.scss';
import { useQuery } from '@apollo/client';
import { GET_USERS } from '../../apollo/query';
import { UserContext } from '../../context/userContext';

const Home = () => {
    const { dispatch } = useContext(UserContext);

    const { loading, error, data } = useQuery(GET_USERS);

    console.log(loading);
    console.log(error);
    console.log(data.users);

    const handleLogoutOnClick = () => {
        dispatch({ type: 'USER_LOGOUT' });
    };

    return (
        <div className='container'>
            <button onClick={handleLogoutOnClick}>Logout</button>
        </div>
    );
};

export default Home;
