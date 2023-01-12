import request from 'supertest-graphql';

import { UPDATE_ANIMAL_MUTATION } from '../../../graphql/mutations/animal.mutations';

import { IAnimal, IUpdateAnimal } from '../../../types/IAnimal';

import server from '../../../server';

const updateMockAnimal = async (animal: IUpdateAnimal) => {
  const { data, errors } = await request(server)
    .mutate(UPDATE_ANIMAL_MUTATION)
    .variables({
      input: {
        ...animal,
      },
    });

  if (data !== undefined) {
    const { updateAnimal } = data as unknown as { updateAnimal: IAnimal };
    return { updateAnimal, errors };
  } else {
    return { errors };
  }
};

export default updateMockAnimal;
