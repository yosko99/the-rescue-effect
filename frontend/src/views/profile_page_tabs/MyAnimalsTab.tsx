import React from 'react';

import { useQuery } from '@apollo/client';
import { Button, Image, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import sadDogIMG from '../../assets/sad-dog.jpeg';
import AnimalCard from '../../components/AnimalCard';
import ProfileTabsTemplate from '../../components/profile_page/ProfileTabsTemplate';
import Loading from '../../components/utils/Loading';
import TOKEN_HEADER from '../../constants/token';
import useAuth from '../../hooks/useAuth';
import useErrorHandle from '../../hooks/useErrorHandle';
import { GET_CURRENT_USER_QUERY } from '../../queries/user.queries';
import { IUser } from '../../types/user.type';

const MyAnimalsTab = () => {
  useAuth();

  const { data, loading, error } = useQuery(
    GET_CURRENT_USER_QUERY,
    { context: { ...TOKEN_HEADER } }
  );

  const navigate = useNavigate();

  useErrorHandle(error);

  if (loading) {
    return <Loading height='50vh'/>;
  }

  const { getCurrentUser: user } = data as { getCurrentUser: IUser};

  return (
    <ProfileTabsTemplate showTabs>
      <p className='text-center fs-1'>My animals</p>
        {user.animals.length === 0
          ? <div className='d-flex justify-content-center align-items-center flex-column p-5 pt-2 text-center'>
                <p className='fs-4'>It look like you don&apos;t have adopted animals yet.</p>
                <Image src={sadDogIMG} fluid alt='sad dog' />
                <p className='fs-4 mt-3'>Go ahead and find your new friend.</p>
                <Button onClick={() => navigate('/')}>Adopt animals</Button>
            </div>
          : <Row className='d-flex justify-content-center p-5 pt-2'>
                {user.animals.map((animal, index: number) => (
                    <Col lg={3} md={6} sm={12} className='my-2' key={index}>
                        <AnimalCard animal={animal} />
                    </Col>
                ))}
            </Row>
        }
    </ProfileTabsTemplate>
  );
};

export default MyAnimalsTab;
