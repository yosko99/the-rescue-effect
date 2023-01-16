import React from 'react';

import { useNavigate } from 'react-router-dom';

const LoginButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    localStorage.getItem('token') === null
      ? <p
            className='m-0 p-3 text-black'
            role={'button'}
            onClick={() => navigate('/login')}>
            Login
        </p>
      : <p
            className='m-0 p-3 text-black'
            role={'button'}
            onClick={() => handleLogout()}>
            Logout
        </p>
  );
};

export default LoginButton;
