import request from 'supertest-graphql';

import { CREATE_ANIMAL_MUTATION } from '../../../graphql/mutations/animal.mutations';

import server from '../../../server';

import { IAnimal } from '../../../types/IAnimal';

const createMockAnimal = async () => {
  const { data } = await request(server)
    .mutate(CREATE_ANIMAL_MUTATION)
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
