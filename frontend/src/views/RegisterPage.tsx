import React, { useEffect, useState } from 'react';

import { useMutation } from '@apollo/client';
import { Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import AnimalCategoryInput from '../components/inputs/AnimalCategoryInput';
import CustomInputWithLabel from '../components/inputs/CustomInputWithLabel';
import GenderInput from '../components/inputs/GenderInput';
import CustomSpinner from '../components/utils/custom/CustomSpinner';
import MainLogo from '../components/utils/MainLogo';
import { CREATE_USER_MUTATION, ICreateUserResponse } from '../mutations/user.mutations';
import { ICreateUser } from '../types/user.type';

const RegisterPage = () => {
  const [userData, setUserData] = useState<ICreateUser>({
    animalPreferences: 'DOG',
    email: '',
    gender: 'MALE',
    name: '',
    password: ''
  });
  const [responseAlert, setResponseAlert] = useState<React.ReactNode>(null);

  const navigate = useNavigate();

  const [createUser, { loading, client }] = useMutation(CREATE_USER_MUTATION);

  const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
    const target = e.target as HTMLInputElement;

    setUserData(() => {
      return {
        ...userData,
        [target.name as keyof ICreateUser]: target.value
      };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUser({
      variables: { input: userData },
      onError: (err: Error) => {
        setResponseAlert(<Alert variant='danger'>{err.message}</Alert>);
      },
      onCompleted: ({ createUser } : ICreateUserResponse) => {
        localStorage.setItem('token', createUser.token);
        setResponseAlert(<Alert variant='success'>{createUser.message}</Alert>);
        client.cache.reset();
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    });
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token !== null) {
      navigate('/');
    }
  }, []);

  return (
    <div className='container d-flex justify-content-center align-items-center' style={{ height: '90vh' }}>
        <div className='shadow-lg p-5 pb-0'>

            <MainLogo />

            <p className='fs-2 text-center mt-0'>Register now and adopt your new companion</p>

            <form className='d-flex flex-column mb-2' onChange={(e) => handleChange(e)} onSubmit={(e) => handleSubmit(e)}>
                <div className='pb-2'>
                    <CustomInputWithLabel value={userData.name} label='Name' name='name'/>
                    <CustomInputWithLabel value={userData.email} label='Email' name='email' type='email'/>
                    <CustomInputWithLabel value={userData.password} label='Password' name='password' type='password'/>
                    <GenderInput value={userData.gender}/>
                    <AnimalCategoryInput value={userData.animalPreferences} name='animalPreferences'/>
                </div>

                {loading ? <CustomSpinner /> : responseAlert}

                <div className='pb-2'>
                    <button type="submit" className="w-100 btn btn-info">Submit</button>
                </div>
            </form>

            <p className='text-center py-2' role='button' onClick={() => navigate('/login')}>
              Already have an account?
            </p>
        </div>
    </div>
  );
};

export default RegisterPage;
