import IAnimal from './IAnimal';

interface IPerson {
  id: string;
  name: string;
  email: string;
  gender: 'MALE' | 'FEMALE';
  animals: IAnimal[];
  animalPreferences: 'DOG' | 'CAT';
  imageURL: string;
  password: string;
}

export default IPerson;
