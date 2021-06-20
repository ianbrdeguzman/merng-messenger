import React from 'react';
import './home.scss';
import Messages from '../../components/messages/Messages';
import Users from '../../components/users/Users';

const Home = () => {
    return (
        <div className='home'>
            <div className='home__content'>
                <Users />
                <Messages />
            </div>
        </div>
    );
};

export default Home;
