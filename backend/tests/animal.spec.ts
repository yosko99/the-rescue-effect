import request from 'supertest-graphql';

import apolloServer from '../apolloServer';
import server from '../server';

import createMockAnimal from './helpers/animal/createMockAnimal';
import deleteMockAnimal from './helpers/animal/deleteMockAnimal';
import updateMockAnimal from './helpers/animal/updateMockAnimal';

import IGraphQLError from '../types/IGraphQLError';
import { IAnimal } from '../types/IAnimal';

import {
  GET_ANIMALS_FOR_ADOPTION_QUERY,
  GET_ANIMALS_QUERY,
  GET_ANIMAL_QUERY,
} from '../graphql/queries/animal.queries';
import { CREATE_ANIMAL_MUTATION } from '../graphql/mutations/animal.mutations';

describe('Testing animal routes', () => {
  afterAll(async () => {
    await apolloServer.stop();
    server.closeAllConnections();
    server.close();
  });

  describe('Test QUERY animal endpoints', () => {
    describe('test QUERY animals', () => {
      test('should get empty array', async () => {
        const { data } = await request(server)
          .query(GET_ANIMALS_QUERY)
          .expectNoErrors();

        const { animals } = data as unknown as { animals: IAnimal[] };

        expect(animals).toHaveLength(0);
      });

      test('should get array with 1 animal', async () => {
        const mockAnimal = await createMockAnimal();
        const { data } = await request(server)
          .query(GET_ANIMALS_QUERY)
          .expectNoErrors();

        const { animals } = data as unknown as { animals: IAnimal[] };

        expect(animals).toHaveLength(1);

        await deleteMockAnimal(mockAnimal.id!);
      });
    });
    describe('test QUERY getAnimal', () => {
      test('get animal with provided existing animal ID', async () => {
        const mockAnimal = await createMockAnimal();

        await request(server)
          .query(GET_ANIMAL_QUERY)
          .variables({ getAnimalId: mockAnimal.id! })
          .expectNoErrors();

        await deleteMockAnimal(mockAnimal.id!);
      });

      test('get animal with provided non existent id', async () => {
        const { errors } = await request(server)
          .query(GET_ANIMAL_QUERY)
          .variables({ getAnimalId: 'test' });

        const responseErrors = errors as unknown as IGraphQLError[];

        expect(responseErrors[0].message).toEqual(
          'Animal with provided id does not exist'
        );
      });
    });

    describe('test QUERY getAnimalsForAdoption', () => {
      test('should get empty array', async () => {
        const { data } = await request(server)
          .query(GET_ANIMALS_FOR_ADOPTION_QUERY)
          .expectNoErrors();

        const { getAnimalsForAdoption } = data as unknown as {
          getAnimalsForAdoption: IAnimal[];
        };
        expect(getAnimalsForAdoption).toHaveLength(0);
      });

      test('should get array with 1 animal open for adoption', async () => {
        const mockAnimal = await createMockAnimal();

        const { data } = await request(server)
          .query(GET_ANIMALS_FOR_ADOPTION_QUERY)
          .expectNoErrors();

        const { getAnimalsForAdoption } = data as unknown as {
          getAnimalsForAdoption: IAnimal[];
        };

        expect(getAnimalsForAdoption[0].isAdopted).toEqual(false);

        await deleteMockAnimal(mockAnimal.id!);
      });
    });
  });

  describe('Test MUTATION animal endpoints', () => {
    describe('test MUTATION createAnimal', () => {
      test('create animal with provided valid data', async () => {
        const mockAnimal = await createMockAnimal();
        expect(mockAnimal.category).toEqual('CAT');
        await deleteMockAnimal(mockAnimal.id!);
      });

      test('create animal with provided invalid data', async () => {
        const { errors } = await request(server)
          .mutate(CREATE_ANIMAL_MUTATION)
          .variables({
            input: {
              age: 1,
              category: 'WRONG',
              description: 'test',
              name: 'test',
            },
          });

        expect(Array.isArray(errors)).toEqual(true);
      });
    });

    describe('test MUTATION deleteAnimal', () => {
      test('delete animal with provided valid animal ID', async () => {
        const mockAnimal = await createMockAnimal();
        const { deleteAnimal } = await deleteMockAnimal(mockAnimal.id!);

        expect(deleteAnimal.message).toEqual('Delete successfull.');
      });

      test('delete animal with provided invalid animal ID', async () => {
        const { errors } = await deleteMockAnimal('test');

        expect(Array.isArray(errors)).toEqual(true);
      });
    });

    describe('test MUTATION updateAnimal', () => {
      test('update animal with provided valid animal ID', async () => {
        const mockAnimal = await createMockAnimal();
        await updateMockAnimal({ id: mockAnimal.id! });
        await deleteMockAnimal(mockAnimal.id!);
      });

      test('update animal with provided invalid animal ID', async () => {
        const { errors } = await updateMockAnimal({ id: 'TEST' });

        expect(errors![0].message).toEqual('Animal with id TEST not found.');
      });

      test('update animal with provided valid animal ID but invalid data', async () => {
        const mockAnimal = await createMockAnimal();
        const { errors } = await updateMockAnimal({
          id: mockAnimal.id!,
          // @ts-ignore
          category: 'TEST',
        });

        expect(Array.isArray(errors)).toEqual(true);
        await deleteMockAnimal(mockAnimal.id!);
      });
    });
  });
});
