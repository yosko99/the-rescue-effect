import { gql } from 'apollo-server-express';
import request from 'supertest-graphql';

import server from '../../../server';

import { IAnimal } from '../../../types/IAnimal';

const createMockAnimal = async () => {
  const { data } = await request(server)
    .mutate(
      gql`
        mutation CreateAnimal($input: CreateAnimalInput!) {
          createAnimal(input: $input) {
            id
            name
            age
            description
            category
            imageURL
          }
        }
      `
    )
    .variables({
      input: {
        age: 1,
        category: 'CAT',
        description: 'test',
        name: 'test',
      },
    })
    .expectNoErrors();

  const { createAnimal } = data as unknown as { createAnimal: IAnimal };

  return createAnimal;
};

export default createMockAnimal;
