import { PrismaClient } from '@prisma/client';
import * as bcryptjs from 'bcryptjs';
import axios from 'axios';

import IRandomUserResponse from '../../types/IRandomUserResponse';
import IUser from '../../types/IUser';

import checkExistingUserByEmail from '../functions/user/checkExistingUserByEmail';
import generateToken from '../../functions/generateToken';

const prisma = new PrismaClient();

module.exports = {
  Query: {
    users: async () => {
      const users = await prisma.user.findMany({
        include: { animals: true },
      });

      return users;
    },

    getUser: async (_prev: unknown, { id }: { id: string }) => {
      const user = await prisma.user.findFirst({
        where: { id },
        include: { animals: true },
      });

      if (user === null) {
        throw new Error(`User with id ${id} not found.`);
      }

      return user;
    },
  },

  Mutation: {
    createUser: async (_prev: unknown, { input }: { input: IUser }) => {
      const dogAPI = await axios.get('https://randomuser.me/api/');
      const dogData: IRandomUserResponse = dogAPI.data;

      const { animalPreferences, email, gender, name, password } = input;

      const hashedPassword = await bcryptjs.hash(password, 10);

      const doesUserExists =
        (await prisma.user.findUnique({
          where: { email },
        })) !== null;

      if (!doesUserExists) {
        const user = await prisma.user.create({
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
          user,
          message: 'User created successfully.',
          token: generateToken(email, hashedPassword),
        };
      }

      throw new Error('User with provided email already exists.');
    },

    updateUser: async (_prev: unknown, { input }: { input: IUser }) => {
      const { id, animalPreferences, gender, name } = input;

      const updatedUser = await prisma.user
        .update({
          where: { id },
          data: {
            animalPreferences,
            gender,
            name,
          },
        })
        .catch((_err) => {
          throw new Error(`User with id ${id} not found.`);
        });

      return updatedUser;
    },

    deleteUser: async (_prev: unknown, { id }: { id: string }) => {
      try {
        await prisma.user.delete({ where: { id } });
      } catch (error) {
        throw new Error(`User with id ${id} not found.`);
      }

      return {
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
