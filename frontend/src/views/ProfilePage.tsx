import React from 'react';

import { Container } from 'react-bootstrap';

import ProfilePageTabs from '../components/profile_page/ProfilePageTabs';
import Footer from '../components/utils/Footer';
import Header from '../components/utils/Header';
import ProfileTab from './profile_page_tabs/ProfileTab';

const ProfilePage = () => {
  return (
    <>
        <Header />
        <Container>
            <div className='shadow mt-5'>
              <ProfilePageTabs />
              <ProfileTab />
            </div>
        </Container>
        <Footer />
    </>

  );
};

export default ProfilePage;
