import React from 'react';

import CreateAnimalForm from '../../components/profile_page/CreateAnimalForm';
import ProfileTabsTemplate from '../../components/profile_page/ProfileTabsTemplate';
import useAuth from '../../hooks/useAuth';

const AddForAdoptionTab = () => {
  useAuth();

  return (
    <ProfileTabsTemplate showTabs>
      <p className='text-center fs-1'>Add animal for adoption</p>
      <CreateAnimalForm />
    </ProfileTabsTemplate>
  );
};

export default AddForAdoptionTab;
