import React from 'react';

import { useQuery } from '@apollo/client';
import { Col, Row } from 'react-bootstrap';

import AnimalCard from '../components/AnimalCard';
import CreateAnimalForm from '../components/CreateAnimalForm';
import Header from '../components/utils/Header';
import { GET_ANIMALS_FOR_ADOPTION_QUERY } from '../queries/animal.queries';
import { IAnimal } from '../types/animal.type';

const MainPage = () => {
  const { data, loading } = useQuery(GET_ANIMALS_FOR_ADOPTION_QUERY);

  if (loading) {
    return <div className='App-header'>Loading</div>;
  }

  return (
    <>
      <Header />
      <div className='App-header'>
        <div className='container'>
          <CreateAnimalForm />
          {data.getAnimalsForAdoption === undefined || data.getAnimalsForAdoption.length === 0
            ? <p className='fs-3 text-center'>No data</p>
            : <Row>
            {data.getAnimalsForAdoption.map((animal: IAnimal, index: number) => (
              <Col lg={3} md={6} sm={12} className='my-2' key={index}>
                <AnimalCard animal={animal} />
              </Col>
            ))}
          </Row>
          }
        </div>
      </div>
    </>
  );
};

export default MainPage;
