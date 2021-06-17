import React from 'react';
import './register.scss';
import { useForm } from 'react-hook-form';

const Register = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const handleSubmitOnClick = (data) => {
        console.log(data);
    };

    return (
        <div className='register'>
            <div className='register__content'>
                <div className='register__content__left'>
                    <h1>Hang out anytime, anywhere</h1>
                    <p>
                        Messenger makes it easy and fun to stay close to your
                        favorite people.
                    </p>
                    <form
                        className='register__content__left__form'
                        onSubmit={handleSubmit(handleSubmitOnClick)}
                    >
                        <div>
                            <input
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
                        <div>
                            <input
                                type='password'
                                {...register('confirmPassword', {
                                    validate: (value) =>
                                        value === watch('password') ||
                                        'Password does not match.',
                                })}
                                id='confirmPassword'
                                placeholder='Confirm Password'
                            />
                            {errors.confirmPassword && (
                                <span>{errors.confirmPassword.message}</span>
                            )}
                        </div>
                        <button type='submit'>Register</button>
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
