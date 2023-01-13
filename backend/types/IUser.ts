import { AnimalTypes } from '@prisma/client';
import { IAnimal } from './IAnimal';

export type GendersType = 'MALE' | 'FEMALE';

export interface IUser {
  id: string;
  name: string;
  email: string;
  gender: GendersType;
  animals: IAnimal[];
  animalPreferences: AnimalTypes;
  imageURL: string;
  password: string;
}

export interface IUpdateUser {
  id: string;
  name?: string;
  gender?: GendersType;
  animalPreferences?: AnimalTypes;
}

export default IUser;
