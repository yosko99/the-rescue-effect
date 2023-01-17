import React from 'react';

import { Col, Row, Image } from 'react-bootstrap';

import catsButtonIMG from '../assets/cats-button.png';
import dogsButtonIMG from '../assets/dogs-button.png';
import mainpageHeadingIMG from '../assets/mainpage-heading.jpg';

const MainPageHeader = () => {
  return (
    <div className='d-flex justify-content-center align-items-center text-white flex-column mb-5' style={{
      width: '100%',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      minHeight: '400px',
      backgroundRepeat: 'no-repeat',
      backgroundImage: `url(${mainpageHeadingIMG})`
    }}>
        <p className='fs-1 font-weight-bold my-2'>Find your new best friend</p>
        <Row>
          <Col className='d-flex justify-content-center align-items-center my-2'>
            <Image role={'button'} src={catsButtonIMG}/>
          </Col>
          <Col className='d-flex justify-content-center align-items-center my-2'>
            <Image role={'button'} src={dogsButtonIMG}/>
          </Col>
        </Row>
    </div>
  );
};

export default MainPageHeader;
