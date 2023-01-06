import { PrismaClient } from '@prisma/client';
import axios from 'axios';

import IDogResponse from './types/IDogResponse';

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    animals: async () => await prisma.animal.findMany(),

    getAnimal: async (_, { id }) => {
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
    createAnimal: async (
      _,
      { input: { name, age, description, category } }
    ) => {
      const dogAPI = await axios.get('https://dog.ceo/api/breeds/image/random');
      const dogData: IDogResponse = dogAPI.data;

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

    updateAnimal: async (
      _,
      { input: { id, name, age, description, category } }
    ) => {
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

    deleteAnimal: async (_, { id }) => {
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
