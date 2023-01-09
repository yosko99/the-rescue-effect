export interface AnimalType {
  id: String;
  name: string;
  age: Number;
  description: string;
  category: string;
  imageURL: string;
}

export interface CreateAnimalType {
  name: string;
  age: number;
  description: string;
  category: 'DOG' | 'CAT';
}
