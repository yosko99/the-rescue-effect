import request from 'supertest-graphql';

import { DELETE_ANIMAL_MUTATION } from '../../../graphql/mutations/animal.mutations';

import server from '../../../server';

const deleteMockAnimal = async (animalID: string) => {
  const { data, errors } = await request(server)
    .mutate(DELETE_ANIMAL_MUTATION)
    .variables({
      id: animalID,
    });

  const { deleteAnimal } = data as unknown as {
    deleteAnimal: { message: string };
  };

  return { deleteAnimal, errors };
};

export default deleteMockAnimal;
