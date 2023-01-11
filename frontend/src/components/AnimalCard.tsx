import * as React from 'react';

import { useMutation } from '@apollo/client';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { ADOPT_ANIMAL_MUTATION } from '../mutations/user.mutations';
import { GET_ANIMALS_FOR_ADOPTION_QUERY } from '../queries/animal.queries';
import { AnimalType } from '../types/animal.type';

interface Props {
  animal: AnimalType;
}

const AnimalCard:React.FC<Props> = ({ animal }) => {
  const [adoptAnimal] = useMutation(
    ADOPT_ANIMAL_MUTATION,
    { context: { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } } }
  );

  const navigate = useNavigate();

  const handleAdopt = () => {
    const token = localStorage.getItem('token');

    if (token === null) {
      navigate('/register');
    } else {
      adoptAnimal({ variables: { animalID: animal.id }, refetchQueries: [GET_ANIMALS_FOR_ADOPTION_QUERY] });
    }
  };

  return (
    <Card className='text-black'>
      <Card.Img
        style={{ width: '250px', height: '250px', objectFit: 'cover' }}
        className='w-100'
        variant="top"
        alt={animal.name}
        src={animal.imageURL}
      />
      <Card.Body>
        <Card.Title>{`${animal.name} (${animal.age} ${animal.age === 1 ? 'year' : 'years'}) `}</Card.Title>
        <Card.Text className='fs-5'>{animal.description}</Card.Text>
        <Button variant='info' onClick={handleAdopt}>Adopt</Button>
      </Card.Body>
    </Card>
  );
};

export default AnimalCard;
