import React from 'react';

import { useQuery } from '@apollo/client';
import { Col, Image, Row } from 'react-bootstrap';

import Loading from '../../components/utils/Loading';
import { GET_CURRENT_USER_QUERY } from '../../queries/user.queries';
import { IUser } from '../../types/user.type';

const ProfileTab = () => {
  const { data, loading } = useQuery(
    GET_CURRENT_USER_QUERY,
    { context: { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } } }
  );

  if (loading) {
    return <Loading height='50vh'/>;
  }

  const { getCurrentUser: user } = data as { getCurrentUser: IUser};

  return (
    <div>
        <p className='text-center fs-1'>My Profile</p>
        <Row className='p-5'>
            <Col lg={4} className='d-flex justify-content-center align-items-center align-items-lg-start flex-column'>
                <p className='fs-3 text-uppercase'>About me</p>
                <p className='m-0'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti maiores distinctio soluta? Fuga officia facere distinctio iure sed blanditiis sit, necessitatibus nemo asperiores iste tempore suscipit quae. Culpa, accusantium doloribus.</p>
            </Col>
            <Col lg={4} className='d-flex justify-content-center align-items-center'>
                <Image src={user.imageURL} className='my-5' width={250} roundedCircle alt='user image'/>
            </Col>
            <Col lg={4} className='text-uppercase d-flex justify-content-center align-items-center align-items-lg-end flex-column'>
                <p className='fs-3'>Details</p>
                <p className='fs-4'>Name</p>
                <p className='fs-5'>{user.name}</p>
                <p className='fs-4'>Gender</p>
                <p className='fs-5'>{user.gender}</p>
                <p className='fs-4'>Animal preference</p>
                <p className='fs-5'>{user.animalPreferences}</p>
                <p className='fs-4'>Email</p>
                <p className='fs-5'>{user.email}</p>
            </Col>
        </Row>
    </div>
  );
};

export default ProfileTab;
