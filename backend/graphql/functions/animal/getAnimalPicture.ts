import axios from 'axios';

import { AnimalCategoriesType } from '../../../types/IAnimal';
import CatTypeAPI from '../../../types/api/ICatAPI';
import IDogAPI from '../../../types/api/IDogAPI';

const getAnimalPicture = async (category: AnimalCategoriesType) => {
  let animalPicture: string;

  switch (category) {
    case 'CAT': {
      const catAPI = await axios.get(
        'https://api.thecatapi.com/v1/images/search'
      );
      const catData: CatTypeAPI = catAPI.data;
      animalPicture = catData[0].url;
      break;
    }

    case 'DOG': {
      const dogAPI = await axios.get('https://dog.ceo/api/breeds/image/random');
      const dogData: IDogAPI = dogAPI.data;
      animalPicture = dogData.message;

      break;
    }

    default:
      throw new Error('Invalid animal category');
  }

  return animalPicture;
};

export default getAnimalPicture;
