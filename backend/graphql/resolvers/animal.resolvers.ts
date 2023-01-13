import { PrismaClient } from '@prisma/client';

import getAnimalPicture from '../functions/animal/getAnimalPicture';

import { IAnimal } from '../../types/IAnimal';
import checkExistingAnimalByID from '../functions/animal/checkExistingAnimalByID';

const prisma = new PrismaClient();

module.exports = {
  Query: {
    animals: async () => {
      return await prisma.animal.findMany();
    },

    getAnimal: async (_prev: unknown, { id }: { id: string }) => {
      const animal = await checkExistingAnimalByID(id);

      return animal;
    },

    getAnimalsForAdoption: async () => {
      return await prisma.animal.findMany({ where: { isAdopted: false } });
    },
  },

  Mutation: {
    createAnimal: async (_prev: unknown, { input }: { input: IAnimal }) => {
      const { age, name, description, category } = input;

      const animal = await prisma.animal.create({
        data: {
          age: Number(age),
          name,
          description,
          category,
          imageURL: await getAnimalPicture(category),
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
        .catch((_err: Error) => {
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
