import React from 'react';

import { Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import logoIMG from '../../assets/logo.jpg';

interface Props {
  width?: number;
  height?: number;
  rounded?: boolean;
}

const MainLogo:React.FC<Props> = ({ width, height, rounded }) => {
  const navigate = useNavigate();

  return (
    <div className='d-flex justify-content-center align-items-center'>
        <Image
            onClick={() => navigate('/')}
            src={logoIMG}
            fluid
            roundedCircle={rounded}
            width={width !== undefined ? width : 200}
            height={height !== undefined ? height : 200}
            alt='The Rescue Effect'
            role='button'
        />
    </div>
  );
};

export default MainLogo;
