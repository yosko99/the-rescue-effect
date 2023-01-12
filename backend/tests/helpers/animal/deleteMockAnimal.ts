import { gql } from 'apollo-server-express';
import request from 'supertest-graphql';

import server from '../../../server';

const deleteMockAnimal = async (animalID: string) => {
  const { data } = await request(server)
    .mutate(
      gql`
        mutation DeleteAnimal($id: String!) {
          deleteAnimal(id: $id) {
            message
          }
        }
      `
    )
    .variables({
      id: animalID,
    })
    .expectNoErrors();

  const { deleteAnimal } = data as unknown as {
    deleteAnimal: { message: string };
  };

  return deleteAnimal;
};

export default deleteMockAnimal;
