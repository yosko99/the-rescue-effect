import React, { useEffect, useState } from 'react';

import { useMutation } from '@apollo/client';
import { Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import CustomInputWithLabel from '../components/inputs/CustomInputWithLabel';
import CustomSpinner from '../components/utils/custom/CustomSpinner';
import MainLogo from '../components/utils/MainLogo';
import { ILoginResponse, LOGIN_MUTATION } from '../mutations/user.mutations';
import { ILoginUser } from '../types/user.type';

const LoginPage = () => {
  const [loginData, setLoginData] = useState<ILoginUser>({
    email: '',
    password: ''
  });
  const [responseAlert, setResponseAlert] = useState<React.ReactNode>(null);

  const navigate = useNavigate();

  const [login, { loading, client }] = useMutation(LOGIN_MUTATION);

  const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
    const target = e.target as HTMLInputElement;

    setLoginData(() => {
      return {
        ...loginData,
        [target.name as keyof ILoginUser]: target.value
      };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({
      variables: { input: loginData },
      onError: (err: Error) => {
        setResponseAlert(<Alert variant='danger'>{err.message}</Alert>);
      },
      onCompleted: ({ login } : ILoginResponse) => {
        localStorage.setItem('token', login.token);
        setResponseAlert(<Alert variant='success'>{login.message}</Alert>);
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

            <p className='fs-2 text-center mt-0'>Good to see you again!</p>

            <form className='d-flex flex-column mb-2' onChange={(e) => handleChange(e)} onSubmit={(e) => handleSubmit(e)}>
                <div className='pb-2'>
                    <CustomInputWithLabel value={loginData.email} label='Email' name='email' type='email'/>
                    <CustomInputWithLabel value={loginData.password} label='Password' name='password' type='password'/>
                </div>

                {loading ? <CustomSpinner /> : responseAlert}

                <div className='pb-2'>
                    <button type="submit" className="w-100 btn btn-info">Submit</button>
                </div>

            </form>

            <p className='text-center py-2' role='button' onClick={() => navigate('/register')}>
              Don&apos;t have an account?
            </p>
        </div>
    </div>
  );
};

export default LoginPage;
