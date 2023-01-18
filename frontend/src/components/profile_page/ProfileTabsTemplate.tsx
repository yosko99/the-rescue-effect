import React from 'react';

import { Container } from 'react-bootstrap';

import ProfilePageTabs from '../../components/profile_page/ProfilePageTabs';
import Footer from '../../components/utils/Footer';
import Header from '../../components/utils/Header';

interface Props {
  children: React.ReactNode;
  showTabs: boolean;
}

const ProfileTabsTemplate:React.FC<Props> = ({ children, showTabs }) => {
  return (
    <div>
        <Header />
        <Container style={{ minHeight: '85vh' }}>
            <div className='shadow mt-5'>
              {showTabs && <ProfilePageTabs />}
              {children}
            </div>
        </Container>
        <Footer />
    </div>

  );
};

export default ProfileTabsTemplate;
