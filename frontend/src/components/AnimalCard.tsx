import * as React from 'react';

import { Button, Card } from 'react-bootstrap';

import timeFormatter from '../functions/timeFormatter';
import { IAnimal } from '../types/animal.type';
import AdoptModal from './AdoptModal';

interface Props {
  animal: IAnimal;
}

const AnimalCard:React.FC<Props> = ({ animal }) => {
  const [modalShow, setModalShow] = React.useState(false);

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
        <Card.Text className='fs-5 mb-3'>
          <span className='m-0'>Description <br/></span>
          {animal.description}
          </Card.Text>
        {animal.isAdopted
          ? <>This little guy was adopted on {timeFormatter(animal.updatedAt)}</>
          : <Button variant='dark' onClick={() => setModalShow(true)}>Adopt</Button>
        }
        <AdoptModal animal={animal} onHide={() => setModalShow(false)} show={modalShow}/>
      </Card.Body>
    </Card>
  );
};

export default AnimalCard;
