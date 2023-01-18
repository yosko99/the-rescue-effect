import React from 'react';

import { Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface IProfileTabButton {
    button: string;
    route: string;
}

const ProfilePageTabs = () => {
  const tabs: IProfileTabButton[] = [
    { button: 'My Animals', route: '/my-animals' },
    { button: 'My Profile', route: '/profile' },
    { button: 'Edit Profile', route: '/edit-profile' },
    { button: 'Add animal for adoption', route: '/add-for-adoption' }];

  const navigate = useNavigate();

  return (
        <Row className='mb-4'>
            {tabs.map((tab, index: number) => (
            <Col lg={3} key={index}>
                <Button onClick={() => navigate(tab.route)} variant='dark' className='w-100'>
                    {tab.button}
                </Button>
            </Col>
            ))}
        </Row>
  );
};

export default ProfilePageTabs;
