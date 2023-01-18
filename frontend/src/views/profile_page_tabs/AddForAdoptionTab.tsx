import React from 'react';

import { Container } from 'react-bootstrap';

import CreateAnimalForm from '../../components/profile_page/CreateAnimalForm';
import ProfilePageTabs from '../../components/profile_page/ProfilePageTabs';
import Footer from '../../components/utils/Footer';
import Header from '../../components/utils/Header';

const AddForAdoptionTab = () => {
  return (
    <>
      <Header />
      <Container>
          <div className='shadow mt-5'>
            <ProfilePageTabs />
            <p className='text-center fs-1'>Add animal for adoption</p>
            <CreateAnimalForm />
          </div>
      </Container>
      <Footer />
    </>
  );
};

export default AddForAdoptionTab;
