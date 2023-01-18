import React from 'react';

import CreateAnimalForm from '../../components/profile_page/CreateAnimalForm';
import ProfileTabsTemplate from '../../components/profile_page/ProfileTabsTemplate';

const AddForAdoptionTab = () => {
  return (
    <ProfileTabsTemplate >
      <p className='text-center fs-1'>Add animal for adoption</p>
      <CreateAnimalForm />
    </ProfileTabsTemplate>
  );
};

export default AddForAdoptionTab;
