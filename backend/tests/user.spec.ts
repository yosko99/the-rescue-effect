import request from 'supertest-graphql';

import apolloServer from '../apolloServer';
import server from '../server';

import createMockAnimal from './helpers/animal/createMockAnimal';
import updateMockAnimal from './helpers/animal/updateMockAnimal';
import deleteMockAnimal from './helpers/animal/deleteMockAnimal';

import deleteMockUser from './helpers/user/deleteMockUser';
import updateMockUser from './helpers/user/updateMockUser';
import createMockUser from './helpers/user/createMockUser';

import IGraphQLError from '../types/IGraphQLError';
import IUser from '../types/IUser';

import {
  GET_CURRENT_USER_QUERY,
  GET_USERS_QUERY,
  GET_USER_QUERY,
} from '../graphql/queries/user.queries';
import {
  ADOPT_ANIMAL_MUTATION,
  CREATE_USER_MUTATION,
  LOGIN_MUTATION,
} from '../graphql/mutations/user.mutations';

describe('Testing user routes', () => {
  afterAll(async () => {
    await apolloServer.stop();
    server.closeAllConnections();
    server.close();
  });

  describe('Test QUERY user endpoints', () => {
    describe('test QUERY users', () => {
      test('should get empty array', async () => {
        const { data } = await request(server)
          .query(GET_USERS_QUERY)
          .expectNoErrors();

        const { users } = data as unknown as { users: IUser[] };

        expect(users).toHaveLength(0);
      });

      test('should get array with 1 user', async () => {
        const mockUser = await createMockUser();

        const { data } = await request(server)
          .query(GET_USERS_QUERY)
          .expectNoErrors();

        const { users } = data as unknown as { users: IUser[] };

        expect(users).toHaveLength(1);

        await deleteMockUser(mockUser.user.id);
      });
    });
    describe('test QUERY getUser', () => {
      test('get user with provided existing user ID', async () => {
        const mockUser = await createMockUser();

        await request(server)
          .query(GET_USER_QUERY)
          .variables({ getUserId: mockUser.user.id! })
          .expectNoErrors();

        await deleteMockUser(mockUser.user.id!);
      });

      test('get user with provided non existent id', async () => {
        const { errors } = await request(server)
          .query(GET_USER_QUERY)
          .variables({ getUserId: 'test' });

        const responseErrors = errors as unknown as IGraphQLError[];

        expect(responseErrors[0].message).toEqual(
          'User with provided id does not exist'
        );
      });
    });

    describe('test QUERY getCurrentUser', () => {
      test('get current user with provided valid token', async () => {
        const mockUser = await createMockUser();

        await request(server)
          .query(GET_CURRENT_USER_QUERY)
          .set('Authorization', `Bearer ${mockUser.token}`)
          .expectNoErrors();

        await deleteMockUser(mockUser.user.id);
      });

      test('get current user without providing token', async () => {
        const { errors } = await request(server).query(GET_CURRENT_USER_QUERY);

        expect(errors![0].message).toEqual('Token not provided.');
      });

      test('get current user with provided invalid token', async () => {
        const { errors } = await request(server)
          .query(GET_CURRENT_USER_QUERY)
          .set('Authorization', `Bearer TEST`);

        expect(errors![0].message).toEqual('Provided invalid token.');
      });
    });
  });

  describe('Test MUTATION user endpoints', () => {
    describe('test MUTATION createUser', () => {
      test('create user with provided valid data', async () => {
        const mockUser = await createMockUser();
        expect(mockUser.user.gender).toEqual('MALE');
        await deleteMockUser(mockUser.user.id!);
      });

      test('create user with provided invalid data', async () => {
        const { errors } = await request(server)
          .mutate(CREATE_USER_MUTATION)
          .variables({
            input: {
              animalPreferences: 'TEST',
            },
          });

        expect(Array.isArray(errors)).toEqual(true);
      });
    });

    describe('test MUTATION deleteUser', () => {
      test('delete user with provided valid user ID', async () => {
        const mockUser = await createMockUser();
        const { deleteUser } = await deleteMockUser(mockUser.user.id!);

        expect(deleteUser.message).toEqual('Delete successfull.');
      });

      test('delete user with provided invalid user ID', async () => {
        const { errors } = await deleteMockUser('test');

        expect(Array.isArray(errors)).toEqual(true);
      });
    });

    describe('test MUTATION updateUser', () => {
      test('update user with provided valid user ID', async () => {
        const mockUser = await createMockUser();
        await updateMockAnimal({ id: mockUser.user.id! });
        await deleteMockUser(mockUser.user.id!);
      });

      test('update user with provided invalid user ID', async () => {
        const { errors } = await updateMockUser({ id: 'TEST' });

        expect(errors![0].message).toEqual('User with id TEST not found.');
      });

      test('update user with provided valid user ID but invalid data', async () => {
        const mockUser = await createMockUser();
        const { errors } = await updateMockUser({
          id: mockUser.user.id!,
          // @ts-ignore
          gender: 'TEST',
        });

        expect(Array.isArray(errors)).toEqual(true);
        await deleteMockUser(mockUser.user.id!);
      });
    });

    describe('test MUTATION login', () => {
      test('login with valid email and password from existing user', async () => {
        const mockUser = await createMockUser();

        await request(server)
          .mutate(LOGIN_MUTATION)
          .variables({ input: { email: 'testing@test', password: 'test' } })
          .expectNoErrors();

        await deleteMockUser(mockUser.user.id!);
      });

      test('login with valid email but invalid password', async () => {
        const mockUser = await createMockUser();

        const { errors } = await request(server)
          .mutate(LOGIN_MUTATION)
          .variables({ input: { email: 'testing@test', password: 'a' } });

        expect(errors![0].message).toEqual('Password mistmatch');

        await deleteMockUser(mockUser.user.id!);
      });

      test('login with invalid email', async () => {
        const { errors } = await request(server)
          .mutate(LOGIN_MUTATION)
          .variables({ input: { email: 'test', password: 'a' } });

        expect(errors![0].message).toEqual(
          'User with provided email does not exist'
        );
      });
    });

    describe('test MUTATION adoptAnimal', () => {
      test('adopt animal with valid token and valid animal ID', async () => {
        const mockUser = await createMockUser();
        const mockAnimal = await createMockAnimal();

        await request(server)
          .mutate(LOGIN_MUTATION)
          .variables({ input: { email: 'testing@test', password: 'test' } })
          .expectNoErrors();

        await request(server)
          .mutate(ADOPT_ANIMAL_MUTATION)
          .variables({ animalId: mockAnimal.id })
          .set('Authorization', `Bearer ${mockUser.token}`)
          .expectNoErrors();

        await deleteMockUser(mockUser.user.id!);
      });

      test('adopt animal with valid token and invalid animal ID', async () => {
        const mockUser = await createMockUser();

        await request(server)
          .mutate(LOGIN_MUTATION)
          .variables({ input: { email: 'testing@test', password: 'test' } })
          .expectNoErrors();

        const { errors } = await request(server)
          .mutate(ADOPT_ANIMAL_MUTATION)
          .variables({ animalId: 'test' })
          .set('Authorization', `Bearer ${mockUser.token}`);

        expect(Array.isArray(errors)).toEqual(true);

        await deleteMockUser(mockUser.user.id!);
      });

      test('adopt animal without providing user token', async () => {
        const mockUser = await createMockUser();
        const mockAnimal = await createMockAnimal();

        await request(server)
          .mutate(LOGIN_MUTATION)
          .variables({ input: { email: 'testing@test', password: 'test' } })
          .expectNoErrors();

        const { errors } = await request(server)
          .mutate(ADOPT_ANIMAL_MUTATION)
          .variables({ animalId: mockAnimal.id });

        expect(errors![0].message).toEqual('Token not provided.');

        await deleteMockUser(mockUser.user.id!);
        await deleteMockAnimal(mockAnimal.id!);
      });

      test('adopt animal with provided invalid token', async () => {
        const mockUser = await createMockUser();
        const mockAnimal = await createMockAnimal();

        await request(server)
          .mutate(LOGIN_MUTATION)
          .variables({ input: { email: 'testing@test', password: 'test' } })
          .expectNoErrors();

        const { errors } = await request(server)
          .mutate(ADOPT_ANIMAL_MUTATION)
          .variables({ animalId: mockAnimal.id })
          .set('Authorization', `Bearer test`);

        expect(errors![0].message).toEqual('Provided invalid token.');

        await deleteMockUser(mockUser.user.id!);
        await deleteMockAnimal(mockAnimal.id!);
      });
    });
  });
});
