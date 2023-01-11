import IAnimal from './IAnimal';

interface IUser {
  id: string;
  name: string;
  email: string;
  gender: 'MALE' | 'FEMALE';
  animals: IAnimal[];
  animalPreferences: 'DOG' | 'CAT';
  imageURL: string;
  password: string;
}

export default IUser;
