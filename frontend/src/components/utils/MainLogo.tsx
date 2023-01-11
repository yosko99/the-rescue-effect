import React from 'react';

import { Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import logoIMG from '../../assets/logo.jpg';

const MainLogo = () => {
  const navigate = useNavigate();

  return (
    <div className='d-flex justify-content-center align-items-center'>
        <Image
            onClick={() => navigate('/')}
            src={logoIMG}
            width={250}
            height={250}
            alt='The Rescue Effect'
            role='button'
        />
    </div>
  );
};

export default MainLogo;
