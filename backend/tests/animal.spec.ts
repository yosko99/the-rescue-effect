import request from 'supertest-graphql';

import apolloServer from '../apolloServer';
import server from '../server';

import createMockAnimal from './helpers/animal/createMockAnimal';
import deleteMockAnimal from './helpers/animal/deleteMockAnimal';

import IGraphQLError from '../types/IGraphQLError';
import { IAnimal } from '../types/IAnimal';

import {
  GET_ANIMALS_FOR_ADOPTION_QUERY,
  GET_ANIMALS_QUERY,
  GET_ANIMAL_QUERY,
} from '../graphql/queries/animal.queries';

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
});
