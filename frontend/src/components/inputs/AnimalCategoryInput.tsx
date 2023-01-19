import React from 'react';

import ANIMAL_CATEGORIES from '../../constants/animalCategories';
import CustomRadioButton from './CustomRadioButton';

interface Props {
  name: string;
  value: string | number;
}

const AnimalCategoryInput:React.FC<Props> = ({ name, value }) => {
  return (
    <div className="form-group d-flex flex-column py-2">
      <label htmlFor={name}>Animal preferences</label>
      <CustomRadioButton value={value} name={name} buttonData={ANIMAL_CATEGORIES}/>
    </div>
  );
};

export default AnimalCategoryInput;
