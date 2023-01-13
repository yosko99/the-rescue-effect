import request from 'supertest-graphql';

import { CREATE_USER_MUTATION } from '../../../graphql/mutations/user.mutations';

import server from '../../../server';

import IUser from '../../../types/IUser';

const createMockUser = async () => {
  const { data } = await request(server)
    .mutate(CREATE_USER_MUTATION)
    .variables({
      input: {
        animalPreferences: 'CAT',
        email: 'testing@test',
        password: 'test',
        gender: 'MALE',
        name: 'azis',
      },
    })
    .expectNoErrors();

  const { createUser } = data as unknown as {
    createUser: {
      user: IUser;
      message: string;
      token: string;
    };
  };

  return createUser;
};

export default createMockUser;
