import * as React from 'react';

import { useMutation } from '@apollo/client';
import { Button, Card } from 'react-bootstrap';

import { DELETE_ANIMAL_MUTATION } from '../mutations/animal.mutations';
import { GET_ANIMALS_QUERY } from '../queries/animal.queries';
import { AnimalType } from '../types/animal.type';

interface Props {
  animal: AnimalType;
}

const AnimalCard:React.FC<Props> = ({ animal }) => {
  const [deleteAnimal] = useMutation(DELETE_ANIMAL_MUTATION);

  const handleDelete = () => {
    deleteAnimal({ variables: { id: animal.id }, refetchQueries: [GET_ANIMALS_QUERY] });
  };

  return (
    <Card className='text-black'>
      <Card.Img style={{ width: '250px', height: '250px', objectFit: 'cover' }} variant="top" src={animal.imageURL} />
      <Card.Body>
        <Card.Title>{`${animal.name} (${animal.age} years) `}</Card.Title>
        <Card.Text className='fs-5'>{animal.description}</Card.Text>
        <Button variant='danger' onClick={handleDelete}>Delete</Button>
      </Card.Body>
    </Card>
  );
};

export default AnimalCard;
