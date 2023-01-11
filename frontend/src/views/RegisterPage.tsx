import React, { useEffect, useState } from 'react';

import { useMutation } from '@apollo/client';
import { Alert, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import logoIMG from '../assets/logo.jpg';
import CustomInputWithLabel from '../components/inputs/CustomInputWithLabel';
import CustomRadioButton from '../components/inputs/CustomRadioButton';
import animalCategories from '../constants/animalCategories';
import genders from '../constants/genders';
import { CREATE_USER_MUTATION, ICreateUserResponse } from '../mutations/user.mutations';
import { CreateUserType } from '../types/user.type';

const RegisterPage = () => {
  const [userData, setUserData] = useState<CreateUserType>({
    animalPreferences: 'DOG',
    email: '',
    gender: 'MALE',
    name: '',
    password: ''
  });
  const [responseAlert, setResponseAlert] = useState<React.ReactNode>(null);

  const navigate = useNavigate();

  const [createUser] = useMutation(CREATE_USER_MUTATION);

  const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
    const target = e.target as HTMLInputElement;

    setUserData(() => {
      return {
        ...userData,
        [target.name as keyof CreateUserType]: target.value
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
        setResponseAlert(<Alert variant='success'>{createUser.message}</Alert>);
        localStorage.setItem('token', createUser.token);
        setTimeout(() => {
          navigate('/');
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
        <div className='shadow-lg p-4'>

            <div className='d-flex justify-content-center align-items-center'>
                <Image src={logoIMG} width={250} height={250} alt='The Rescue Effect' />
            </div>

            <p className='fs-2 text-center mt-0'>Register now and adopt your new companion</p>

            <form className='d-flex flex-column mb-2' onChange={(e) => handleChange(e)} onSubmit={(e) => handleSubmit(e)}>
                <div className='pb-2'>
                    <CustomInputWithLabel label='Name' name='name'/>
                    <CustomInputWithLabel label='Email' name='email' type='email'/>
                    <CustomInputWithLabel label='Password' name='password' type='password'/>
                    <div className="form-group d-flex flex-column py-2">
                        <label htmlFor='gender'>Gender</label>
                        <CustomRadioButton name='gender' buttonData={genders}/>
                    </div>
                    <div className="form-group d-flex flex-column py-2">
                        <label htmlFor='animalPreferences'>Animal preferences</label>
                        <CustomRadioButton name='animalPreferences' buttonData={animalCategories}/>
                    </div>
                </div>

                {responseAlert}

                <div className='pb-2'>
                    <button type="submit" className="w-100 btn btn-info">Submit</button>
                </div>
            </form>
        </div>
    </div>
  );
};

export default RegisterPage;
