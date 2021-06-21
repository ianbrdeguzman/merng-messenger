import React, { useContext } from 'react';
import './form.scss';
import { useForm } from 'react-hook-form';
import { MdSend } from 'react-icons/md';
import { UserContext } from '../../context/userContext';
import { useMutation } from '@apollo/client';
import { SEND_MESSAGE } from '../../apollo/mutation';
import { MessageContext } from '../../context/messageContext';

const Form = () => {
    const { register, handleSubmit, reset } = useForm();

    const { selectedUser } = useContext(UserContext);

    const { dispatch: messageDispatch } = useContext(MessageContext);

    const [sendMessage] = useMutation(SEND_MESSAGE, {
        onCompleted: (data) => {
            messageDispatch({ type: 'ADD_MESSAGE', payload: data.sendMessage });
        },
        onError: (error) => console.log(error),
    });

    const handleSubmitOnClick = (data) => {
        if (selectedUser) {
            sendMessage({
                variables: {
                    content: data.text,
                    to: selectedUser.username,
                },
            });
            reset();
        }
    };

    return (
        <footer className='conversation__footer'>
            <form onSubmit={handleSubmit(handleSubmitOnClick)}>
                <input
                    type='text'
                    {...register('text', {
                        required: true,
                    })}
                    id='text'
                    placeholder='Aa'
                />
                <button type='submit'>
                    <MdSend size={20} color='#0099ff' />
                </button>
            </form>
        </footer>
    );
};

export default Form;
