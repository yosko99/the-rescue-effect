import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { Alert } from 'react-bootstrap';

import TOKEN_HEADER from '../../constants/token';
import { UPDATE_CURRENT_USER_MUTATION } from '../../mutations/user.mutations';
import { GET_ANIMALS_FOR_ADOPTION_QUERY } from '../../queries/animal.queries';
import refetchUserOnComplete from '../../refetch/refetchUserOnComplete';
import { IUpdateCurrentUser, IUser } from '../../types/user.type';
import AnimalCategoryInput from '../inputs/AnimalCategoryInput';
import CustomInputWithLabel from '../inputs/CustomInputWithLabel';
import GenderInput from '../inputs/GenderInput';

interface Props {
    currentUser: IUser;
}

const UpdateCurrentUserForm: React.FC<Props> = ({ currentUser }) => {
  const [userData, setUserData] = useState<IUpdateCurrentUser>({
    animalPreferences: currentUser.animalPreferences,
    gender: currentUser.gender,
    name: currentUser.name
  });

  const [alert, setAlert] = useState<React.ReactNode>(null);

  const [updateCurrentUser, { client }] = useMutation(
    UPDATE_CURRENT_USER_MUTATION,
    { context: TOKEN_HEADER }
  );

  const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
    const target = e.target as HTMLInputElement;

    setUserData(() => {
      return {
        ...userData,
        [target.name as keyof IUpdateCurrentUser]: target.value
      };
    });

    setAlert(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateCurrentUser({
      variables: { input: userData },
      refetchQueries: [
        GET_ANIMALS_FOR_ADOPTION_QUERY
      ],
      onCompleted: () => refetchUserOnComplete(client)
    });
    setAlert(null);
    setAlert(<Alert variant='success' className='text-center mt-2'>
            User updated.
        </Alert>);
  };

  return (
    <form className='d-flex flex-column mb-2 px-5 pb-3' onChange={(e) => handleChange(e)} onSubmit={(e) => handleSubmit(e)}>
        <div>
            <CustomInputWithLabel value={userData.name} label='Name' name='name' />
            <AnimalCategoryInput value={userData.animalPreferences} name='animalPreferences'/>
            <GenderInput value={userData.gender}/>
        </div>
        <div className='py-2'>
            <button type="submit" className="w-100 btn btn-info">Submit</button>
        </div>
        {alert}
    </form>
  );
};

export default UpdateCurrentUserForm;
