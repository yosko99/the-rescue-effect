import React from 'react';

import { Image } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

import img404 from '../assets/404.webp';
import ProfileTabsTemplate from '../components/profile_page/ProfileTabsTemplate';

const Page404 = () => {
  const location = useLocation();

  return (
    <ProfileTabsTemplate showTabs={false}>
        <div className='d-flex justify-content-center align-items-center flex-column'>
            <Image src={img404} fluid alt='cat 404'/>
            {location.state !== null &&
            <p className='fs-3 mt-3'>
                {location.state?.message}
            </p>
            }
        </div>
    </ProfileTabsTemplate>
  );
};

export default Page404;
