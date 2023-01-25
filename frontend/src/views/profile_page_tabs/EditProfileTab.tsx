import React from 'react';

import { useQuery } from '@apollo/client';

import ProfileTabsTemplate from '../../components/profile_page/ProfileTabsTemplate';
import UpdateCurrentUserForm from '../../components/profile_page/UpdateCurrentUserForm';
import Loading from '../../components/utils/Loading';
import TOKEN_HEADER from '../../constants/token';
import useAuth from '../../hooks/useAuth';
import useErrorHandle from '../../hooks/useErrorHandle';
import { GET_CURRENT_USER_QUERY } from '../../queries/user.queries';
import { IUser } from '../../types/user.type';

const EditProfileTab = () => {
  useAuth();

  const { data, loading, error } = useQuery(
    GET_CURRENT_USER_QUERY,
    { context: { ...TOKEN_HEADER } }
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
