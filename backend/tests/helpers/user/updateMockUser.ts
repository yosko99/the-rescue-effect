import request from 'supertest-graphql';

import { UPDATE_USER_MUTATION } from '../../../graphql/mutations/user.mutations';

import IUser, { IUpdateUser } from '../../../types/IUser';

import server from '../../../server';

const updateMockUser = async (user: IUpdateUser) => {
  const { data, errors } = await request(server)
    .mutate(UPDATE_USER_MUTATION)
    .variables({
      input: {
        ...user,
      },
    });

  if (data !== undefined) {
    const { updateUser } = data as unknown as { updateUser: IUser };
    return { updateUser, errors };
  } else {
    return { errors };
  }
};

export default updateMockUser;
