export interface IAnimal {
  id?: string;
  name: string;
  age: number;
  description: string;
  category: AnimalCategoriesType;
  imageURL: string;
  isAdopted: boolean;
  userId: string;
}

export type AnimalCategoriesType = 'DOG' | 'CAT';
