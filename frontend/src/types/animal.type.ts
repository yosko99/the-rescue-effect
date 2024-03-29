export type AnimalCategoriesType = 'DOG' | 'CAT';

export interface IAnimal {
  id: String;
  name: string;
  age: Number;
  description: string;
  category: AnimalCategoriesType;
  imageURL: string;
  isAdopted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateAnimal {
  name: string;
  age: number;
  description: string;
  category: AnimalCategoriesType;
}
