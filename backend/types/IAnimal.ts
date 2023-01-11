export interface IAnimal {
  id?: string;
  name: string;
  age: number;
  description: string;
  category: AnimalCategories;
  imageURL: string;
  isAdopted: boolean;
  userId: string;
}

export type AnimalCategories = 'DOG' | 'CAT';
