import { PrismaClient } from '@prisma/client';
import axios from 'axios';

import IRandomUserResponse from '../../types/IRandomUserResponse';
import IPerson from '../../types/IPerson';

const prisma = new PrismaClient();

module.exports = {
  Query: {
    persons: async () => {
      const persons = await prisma.person.findMany({
        include: { animals: true },
      });

      return persons;
    },

    getPerson: async (_prev: unknown, { id }: { id: string }) => {
      const person = await prisma.person.findFirst({
        where: { id },
        include: { animals: true },
      });

      if (person === null) {
        return {
          __typename: 'NotFoundError',
          message: `Person with id ${id} not found.`,
        };
      }

      return {
        __typename: 'Person',
        ...person,
      };
    },
  },

  Mutation: {
    createPerson: async (_prev: unknown, { input }: { input: IPerson }) => {
      const dogAPI = await axios.get('https://randomuser.me/api/');
      const dogData: IRandomUserResponse = dogAPI.data;

      const { animalPreferences, email, gender, name } = input;

      const doesUserExists =
        (await prisma.person.findUnique({
          where: { email },
        })) !== null;

      if (!doesUserExists) {
        const person = await prisma.person.create({
          data: {
            animalPreferences: animalPreferences,
            email,
            gender,
            name,
            imageURL: dogData.results[0].picture.large,
          },
        });
        return {
          __typename: 'Person',
          ...person,
        };
      }

      return {
        __typename: 'NotAllowedError',
        message: `User with provided email already exists.`,
      };
    },

    updatePerson: async (_prev: unknown, { input }: { input: IPerson }) => {
      const { id, animalPreferences, gender, name } = input;

      const updatedPerson = await prisma.person
        .update({
          where: { id },
          data: {
            animalPreferences,
            gender,
            name,
            animals: {
              connect: { id: 'dd89f239-6f74-4259-8464-d36f3025d202' },
            },
          },
        })
        .catch((_err) => {
          return {
            __typename: 'NotFoundError',
            message: `Person with id ${id} not found.`,
          };
        });

      return {
        __typename: 'Person',
        ...updatedPerson,
      };
    },

    deletePerson: async (_prev: unknown, { id }: { id: string }) => {
      try {
        await prisma.person.delete({ where: { id } });
      } catch (error) {
        return {
          __typename: 'NotFoundError',
          message: `Person with id ${id} not found.`,
        };
      }

      return {
        __typename: 'SuccessfullRequest',
        message: 'Delete successfull.',
      };
    },
  },
};
