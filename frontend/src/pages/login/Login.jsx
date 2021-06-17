import React, { useState } from 'react';
import './login.scss';
import { useForm } from 'react-hook-form';
import { useLazyQuery } from '@apollo/client';
import Loader from '../../components/loader/Loader';
import { ImSpinner2 } from 'react-icons/im';
import { LOGIN_USER } from '../../apollo/query';
import { useHistory } from 'react-router';

const Login = () => {
    const [error, setError] = useState(null);
    const history = useHistory();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [loginUser, { loading }] = useLazyQuery(LOGIN_USER, {
        onCompleted(res) {
            if (res) history.push('/');
        },
        onError(error) {
            setError(error.message);
        },
    });

    const handleSubmitOnClick = (data) => {
        loginUser({
            variables: {
                username: data.username,
                password: data.password,
            },
        });
    };

    return (
        <div className='login'>
            <div className='login__content'>
                <div className='login__content__left'>
                    <h1>Hang out anytime, anywhere</h1>
                    <p className='login__content__left__info'>
                        Messenger makes it easy and fun to stay close to your
                        favorite people.
                    </p>
                    {error && (
                        <p className='login__content__left__error'>{error}</p>
                    )}
                    <form
                        className='login__content__left__form'
                        onSubmit={handleSubmit(handleSubmitOnClick)}
                    >
                        <div>
                            <input
                                className={errors.username && 'error'}
                                type='text'
                                {...register('username', {
                                    required: 'Please enter a username.',
                                    minLength: {
                                        value: 3,
                                        message:
                                            'Your username must contain atleast 3 characters.',
                                    },
                                })}
                                id='username'
                                placeholder='Username'
                            />
                            {errors.username && (
                                <span>{errors.username.message}</span>
                            )}
                        </div>
                        <div>
                            <input
                                className={errors.password && 'error'}
                                type='password'
                                {...register('password', {
                                    required: 'Please enter a password.',
                                    minLength: {
                                        value: 4,
                                        message:
                                            'Your password must contain atleast 4.',
                                    },
                                    maxLength: {
                                        value: 20,
                                        message:
                                            'Your password must contain atmost 20.',
                                    },
                                })}
                                id='password'
                                placeholder='Password'
                            />
                            {errors.password && (
                                <span>{errors.password.message}</span>
                            )}
                        </div>
                        <button type='submit'>
                            {loading ? (
                                <Loader>
                                    <ImSpinner2 />
                                </Loader>
                            ) : (
                                'Log In'
                            )}
                        </button>
                    </form>
                </div>
                <div className='login__content__right'>
                    <div>
                        <img src='/images/hero.png' alt='hero' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
