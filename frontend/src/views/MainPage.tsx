import React from 'react';

import { useQuery } from '@apollo/client';
import { Typography } from '@mui/material';

import AnimalCard from '../components/AnimalCard';
import CreateAnimalForm from '../components/CreateAnimalForm';
import { GET_ANIMALS_QUERY } from '../queries/getAnimalsQuery';
import { AnimalType } from '../types/animal.type';

const MainPage = () => {
  const { data, loading } = useQuery(GET_ANIMALS_QUERY);

  if (loading) {
    return <div className='App-header'>Loading</div>;
  }

  return (
    <div className='App-header'>
      <div className='container'>
        <CreateAnimalForm />
        <Typography align='center' fontSize={'1em'}>No data :(</Typography>
        {data === undefined
          ? <Typography align='center'>No data</Typography>
          : <div className='d-flex flex-wrap' >
          {data.animals.map((animal: AnimalType, index: number) => (
            <AnimalCard key={index} animal={animal} />
          ))}
        </div>
        }
      </div>
    </div>
  );
};

export default MainPage;
