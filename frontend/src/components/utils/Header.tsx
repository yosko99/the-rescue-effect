import React from 'react';

import { Image, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import logoIMG from '../../assets/logo.jpg';
import CenteredAbsoluteStyle from '../../styles/CenteredAbsoluteStyle';
import LoginButton from './LoginButton';

const Header = () => {
  const navigate = useNavigate();

  return (
  <div className='d-flex flex-column'>
    <div className='shadow-lg d-flex justify-content-end'>
      <Container className='d-flex justify-content-between flex-column flex-sm-row flex-lg-row'>
        <LoginButton />
        <p
            className='m-0 p-3 text-black'
            role={'button'}
            onClick={() => navigate('/favorites')}
            >
            Favorites
        </p>
      </Container>
    </div>
    <CenteredAbsoluteStyle>
      <Image
        src={logoIMG}
        className='border-secondary border'
        alt='logo'
        width={100}
        height={100}
        roundedCircle
        role={'button'}
        onClick={() => navigate('/')}
      />
    </CenteredAbsoluteStyle>
  </div>
  );
};

export default Header;
