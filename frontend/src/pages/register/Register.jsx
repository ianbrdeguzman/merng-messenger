import React, { useState } from 'react';
import './register.scss';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../../apollo/mutation';
import Loader from '../../components/loader/Loader';
import { Link, useHistory } from 'react-router-dom';

const Register = () => {
    const [error, setError] = useState(null);
    const history = useHistory();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const [registerUser, { loading }] = useMutation(REGISTER_USER, {
        update: (_, __) => history.push('/'),
        onError: (error) => setError(error.message),
    });

    const handleSubmitOnClick = (data) => {
        registerUser({
            variables: {
                username: data.username,
                email: data.email,
                password: data.password,
            },
        });
    };

    return (
        <div className='register'>
            <div className='register__content'>
                <div className='register__content__left'>
                    <h1>Hang out anytime, anywhere</h1>
                    <p className='register__content__left__info'>
                        Messenger makes it easy and fun to stay close to your
                        favorite people.
                    </p>
                    {error && (
                        <p className='register__content__left__error'>
                            {error}
                        </p>
                    )}
                    <form
                        className='register__content__left__form'
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
                                className={errors.email && 'error'}
                                type='text'
                                {...register('email', {
                                    required: 'Please enter a valid email.',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message:
                                            'Please enter a valid email address',
                                    },
                                })}
                                id='email'
                                placeholder='Email address'
                            />
                            {errors.email && (
                                <span>{errors.email.message}</span>
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
                                autoComplete='on'
                            />
                            {errors.password && (
                                <span>{errors.password.message}</span>
                            )}
                        </div>
                        <div>
                            <input
                                className={errors.confirmPassword && 'error'}
                                type='password'
                                {...register('confirmPassword', {
                                    validate: (value) =>
                                        value === watch('password') ||
                                        'Password does not match.',
                                })}
                                id='confirmPassword'
                                placeholder='Confirm Password'
                                autoComplete='on'
                            />
                            {errors.confirmPassword && (
                                <span>{errors.confirmPassword.message}</span>
                            )}
                        </div>
                        <div>
                            <button type='submit'>
                                {loading ? <Loader /> : 'Register'}
                            </button>
                            <Link to='/'>Already have an account?</Link>
                        </div>
                    </form>
                </div>
                <div className='register__content__right'>
                    <div>
                        <img src='/images/hero.png' alt='hero' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
