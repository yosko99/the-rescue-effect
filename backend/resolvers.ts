import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import IAnimal from './types/IAnimal';

import IDogResponse from './types/IDogResponse';

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    animals: async () => await prisma.animal.findMany(),

    getAnimal: async (_prev: unknown, { id }: { id: string }) => {
      const animal = await prisma.animal.findFirst({ where: { id } });

      if (animal === null) {
        return {
          __typename: 'NotFoundError',
          message: `Animal with id ${id} not found.`,
        };
      }

      return {
        __typename: 'Animal',
        ...animal,
      };
    },
  },

  Mutation: {
    createAnimal: async (_prev: unknown, { input }: { input: IAnimal }) => {
      const dogAPI = await axios.get('https://dog.ceo/api/breeds/image/random');
      const dogData: IDogResponse = dogAPI.data;

      const { age, name, description, category } = input;

      const animal = await prisma.animal.create({
        data: {
          age: Number(age),
          name,
          description,
          category,
          imageURL: dogData.message,
        },
      });

      return {
        ...animal,
      };
    },

    updateAnimal: async (_prev: unknown, { input }: { input: IAnimal }) => {
      const { id, age, name, description, category } = input;

      const updatedProduct = await prisma.animal
        .update({
          where: { id },
          data: { age, name, description, category },
        })
        .catch((_err) => {
          return {
            __typename: 'NotFoundError',
            message: `Product with id ${id} not found.`,
          };
        });

      return {
        __typename: 'Animal',
        ...updatedProduct,
      };
    },

    deleteAnimal: async (_prev: unknown, { id }: { id: string }) => {
      try {
        await prisma.animal.delete({ where: { id } });
      } catch (error) {
        return {
          __typename: 'NotFoundError',
          message: `Animal with id ${id} not found.`,
        };
      }

      return {
        __typename: 'SuccessfullRequest',
        message: 'Delete successfull.',
      };
    },
  },
};

export default resolvers;
