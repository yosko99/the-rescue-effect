import React from 'react';

import { useQuery } from '@apollo/client';

import AnimalCard from '../components/AnimalCard';
import CreateAnimalForm from '../components/CreateAnimalForm';
import { GET_ANIMALS_FOR_ADOPTION_QUERY } from '../queries/animal.queries';
import { AnimalType } from '../types/animal.type';

const MainPage = () => {
  const { data, loading } = useQuery(GET_ANIMALS_FOR_ADOPTION_QUERY);

  if (loading) {
    return <div className='App-header'>Loading</div>;
  }

  return (
    <div className='App-header'>
      <div className='container'>
        <CreateAnimalForm />
        {data.getAnimalsForAdoption === undefined || data.getAnimalsForAdoption.length === 0
          ? <p className='fs-3 text-center'>No data</p>
          : <div className='d-flex flex-wrap' >
          {data.getAnimalsForAdoption.map((animal: AnimalType, index: number) => (
            <AnimalCard key={index} animal={animal} />
          ))}
        </div>
        }
      </div>
    </div>
  );
};

export default MainPage;
