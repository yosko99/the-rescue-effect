import { PrismaClient } from '@prisma/client';
import axios from 'axios';

import IAnimal from '../../types/IAnimal';
import IDogResponse from '../../types/IDogResponse';

const prisma = new PrismaClient();

module.exports = {
  Query: {
    animals: async () => {
      return await prisma.animal.findMany();
    },

    getAnimal: async (_prev: unknown, { id }: { id: string }) => {
      const animal = await prisma.animal.findFirst({ where: { id } });

      if (animal === null) {
        throw new Error(`Animal with id ${id} not found.`);
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

      return animal;
    },

    updateAnimal: async (_prev: unknown, { input }: { input: IAnimal }) => {
      const { id, age, name, description, category } = input;

      const updatedAnimal = await prisma.animal
        .update({
          where: { id },
          data: { age, name, description, category },
        })
        .catch((_err) => {
          throw new Error(`Animal with id ${id} not found.`);
        });

      return updatedAnimal;
    },

    deleteAnimal: async (_prev: unknown, { id }: { id: string }) => {
      try {
        await prisma.animal.delete({ where: { id } });
      } catch (error) {
        throw new Error(`Animal with id ${id} not found.`);
      }

      return {
        message: 'Delete successfull.',
      };
    },
  },
};
