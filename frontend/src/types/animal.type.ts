export interface AnimalType {
  id: Number;
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
  category: string;
}
