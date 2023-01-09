interface IAnimal {
  id?: string;
  name: string;
  age: number;
  description: string;
  category: 'DOG' | 'CAT';
  imageURL: string;
  isAdopted: boolean;
  personId: string;
}

export default IAnimal;
