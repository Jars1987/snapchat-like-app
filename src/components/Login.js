import { Button } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { signInUser } from '../state/features/appSlice';
import './Login.css';

function Login() {
  const dispatch = useDispatch();

  const signIn = () => {
    dispatch(signInUser());
  };

  return (
    <div className='login'>
      <div className='login__container'>
        <img
          src='https://t.ctcdn.com.br/SmuvOS5JjmO6pMXWoUE5sLjUhP0=/512x288/smart/i12720.png'
          alt='snapchat logo'
        />
        <Button variant='outlined' onClick={signIn}>
          Sign In
        </Button>
      </div>
    </div>
  );
}

export default Login;
