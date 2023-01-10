import { PrismaClient } from '@prisma/client';
import * as bcryptjs from 'bcryptjs';
import axios from 'axios';

import IRandomUserResponse from '../../types/IRandomUserResponse';
import IPerson from '../../types/IPerson';

import checkExistingUserByEmail from '../functions/user/checkExistingUserByEmail';
import generateToken from '../../functions/generateToken';

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

      const { animalPreferences, email, gender, name, password } = input;

      const hashedPassword = await bcryptjs.hash(password, 10);

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
            password: hashedPassword,
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

    login: async (
      _prev: unknown,
      { input }: { input: { password: string; email: string } }
    ) => {
      const user = await checkExistingUserByEmail(input.email);

      const isPasswordValid = await bcryptjs.compareSync(
        input.password,
        user.password
      );

      if (isPasswordValid) {
        return {
          message: 'You have logged in successfully.',
          token: generateToken(user.email, input.password),
        };
      }

      throw new Error('Password mistmatch');
    },
  },
};
