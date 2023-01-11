import { AnimalCategoriesType } from './animal.type';

export type GendersType = 'MALE' | 'FEMALE';

export interface CreateUserType {
  name: string;
  email: string;
  gender: GendersType;
  password: string;
  animalPreferences: AnimalCategoriesType;
}
