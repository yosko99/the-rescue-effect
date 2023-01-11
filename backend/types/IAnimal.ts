interface IAnimal {
  id?: string;
  name: string;
  age: number;
  description: string;
  category: 'DOG' | 'CAT';
  imageURL: string;
  isAdopted: boolean;
  userId: string;
}

export default IAnimal;
