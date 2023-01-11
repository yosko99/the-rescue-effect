export type AnimalCategoriesType = 'DOG' | 'CAT';

export interface AnimalType {
  id: String;
  name: string;
  age: Number;
  description: string;
  category: AnimalCategoriesType;
  imageURL: string;
}

export interface CreateAnimalType {
  name: string;
  age: number;
  description: string;
  category: AnimalCategoriesType;
}
