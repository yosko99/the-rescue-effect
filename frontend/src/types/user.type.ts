import { AnimalCategoriesType } from './animal.type';

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
