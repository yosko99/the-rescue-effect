import React from 'react';

import { useQuery } from '@apollo/client';
import { Row, Col, Image } from 'react-bootstrap';

import happyDogIMG from '../assets/happy-dog.jpg';
import { GET_ANIMALS_FOR_ADOPTION_QUERY } from '../queries/animal.queries';
import { IAnimal } from '../types/animal.type';
import AnimalCard from './AnimalCard';

const AnimalsForAdoption = () => {
  const { data, loading } = useQuery(
    GET_ANIMALS_FOR_ADOPTION_QUERY,
    { context: { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } } }
  );

  if (loading) {
    return <div className='App-header'>Loading</div>;
  }

  return data.getAnimalsForAdoption === undefined || data.getAnimalsForAdoption.length === 0
    ? <div className='d-flex justify-content-center align-items-center flex-column'>
        <Image width={250} height={250} roundedCircle src={happyDogIMG} alt='happy dog'/>
        <p className='fs-4 mt-4'>All our animals found their homes. Currently we do not have animals for adoption.</p>
      </div>
    : <Row className='d-flex justify-content-center'>
      {data.getAnimalsForAdoption.map((animal: IAnimal, index: number) => (
        <Col lg={3} md={6} sm={12} className='my-2' key={index}>
          <AnimalCard animal={animal} />
        </Col>
      ))}
    </Row>;
};

export default AnimalsForAdoption;
