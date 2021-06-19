import React, { useContext } from 'react';
import './home.scss';
import { useQuery } from '@apollo/client';
import { GET_USERS } from '../../apollo/query';
import { UserContext } from '../../context/userContext';
import { HiOutlineLogout } from 'react-icons/hi';
import Users from '../../components/users/Users';

const Home = () => {
    const { user: loggedUser, dispatch } = useContext(UserContext);

    const { _, __, data } = useQuery(GET_USERS);

    return (
        <div className='home'>
            <div className='home__content'>
                <div className='home__content__left'>
                    <header className='home__content__left__header'>
                        <img
                            src={loggedUser.imageUrl}
                            alt={`${loggedUser.username}-avatar`}
                        />
                        <h1>Chats</h1>
                        <button
                            onClick={() => dispatch({ type: 'USER_LOGOUT' })}
                        >
                            <HiOutlineLogout />
                        </button>
                    </header>
                    <Users users={data} />
                </div>
                <div className='home__content__right'>Messages</div>
            </div>
        </div>
    );
};

export default Home;
