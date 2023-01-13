import request from 'supertest-graphql';

import { DELETE_USER_MUTATION } from '../../../graphql/mutations/user.mutations';

import server from '../../../server';

const deleteMockUser = async (userID: string) => {
  const { data, errors } = await request(server)
    .mutate(DELETE_USER_MUTATION)
    .variables({
      deleteUserId: userID,
    });

  const { deleteUser } = data as unknown as {
    deleteUser: { message: string };
  };

  return { deleteUser, errors };
};

export default deleteMockUser;
