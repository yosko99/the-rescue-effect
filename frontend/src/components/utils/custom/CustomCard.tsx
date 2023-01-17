import React from 'react';

import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface Props {
    title: string;
    description: string;
    button: string;
    route: string;
}

const CustomCard:React.FC<Props> = ({ button, description, route, title }) => {
  const navigate = useNavigate();

  return (
        <div className='text-center'>
            <p className='fs-3'>{title}</p>
            <p className='fs-4'>{description}</p>
            <Button variant='primary' onClick={() => navigate(route)}>
                {button}
            </Button>
        </div>
  );
};

export default CustomCard;
