import { AnimalCategoriesType, IAnimal } from './animal.type';

export type GendersType = 'MALE' | 'FEMALE';

export interface ICreateUser {
  name: string;
  email: string;
  gender: GendersType;
  password: string;
  animalPreferences: AnimalCategoriesType;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  gender: GendersType;
  animals: IAnimal[];
  animalPreferences: AnimalCategoriesType;
  imageURL: string;
  password: string;
}

export interface IUpdateCurrentUser {
  name: string;
  animalPreferences: AnimalCategoriesType;
  gender: GendersType;
}
