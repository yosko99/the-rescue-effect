import React from 'react';

import { useQuery } from '@apollo/client';

import ProfileTabsTemplate from '../../components/profile_page/ProfileTabsTemplate';
import UpdateCurrentUserForm from '../../components/profile_page/UpdateCurrentUserForm';
import Loading from '../../components/utils/Loading';
import useAuth from '../../hooks/useAuth';
import useErrorHandle from '../../hooks/useErrorHandle';
import { GET_CURRENT_USER_QUERY } from '../../queries/user.queries';
import { IUser } from '../../types/user.type';

const EditProfileTab = () => {
  useAuth();

  const { data, loading, error } = useQuery(
    GET_CURRENT_USER_QUERY,
    { context: { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } } }
  );

  useErrorHandle(error);

  if (loading) {
    return <Loading height='50vh'/>;
  }

  const { getCurrentUser: user } = data as { getCurrentUser: IUser};

  return (
    <ProfileTabsTemplate showTabs>
      <p className='text-center fs-1'>Update profile</p>
      <UpdateCurrentUserForm currentUser={user}/>
    </ProfileTabsTemplate>
  );
};

export default EditProfileTab;
