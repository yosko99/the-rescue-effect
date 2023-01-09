import React, { useState } from 'react';

import { useMutation } from '@apollo/client';

import animalCategories from '../constants/animalCategories';
import { CREATE_ANIMAL_MUTATION } from '../mutations/animal.mutations';
import { GET_ANIMALS_QUERY } from '../queries/animal.queries';
import { CreateAnimalType } from '../types/animal.type';
import CustomRadioButton from './inputs/CustomRadioButton';

const CreateAnimalForm = () => {
  const [animalData, setAnimalData] = useState<CreateAnimalType>({
    category: 'DOG',
    description: '',
    age: 1,
    name: ''
  });
  const [createAnimal] = useMutation(CREATE_ANIMAL_MUTATION);

  const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
    const target = e.target as HTMLInputElement;

    setAnimalData(() => {
      return {
        ...animalData,
        [target.name as keyof CreateAnimalType]: target.name === 'age' ? Number(target.value) : target.value
      };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createAnimal({ variables: { input: animalData }, refetchQueries: [GET_ANIMALS_QUERY] });
  };

  return (
        <form className='d-flex flex-column mb-2' onChange={(e) => handleChange(e)} onSubmit={(e) => handleSubmit(e)}>
            <div>
                <div className="form-group py-2">
                    <label htmlFor='name'>Name</label>
                    <input
                        type="text"
                        required
                        className="form-control"
                        name='name'
                        id="name"
                        placeholder="Name"
                    />
                </div>
                <div className="form-group py-2">
                    <label htmlFor='description'>Description</label>
                    <input
                        type="text"
                        required
                        className="form-control"
                        name='description'
                        id="Description"
                        placeholder="Description"
                    />
                </div>
                <div className="form-group py-2">
                    <label htmlFor='age'>Age</label>
                    <input
                        type="number"
                        required
                        min={1}
                        className="form-control"
                        name='age'
                        id="age"
                        placeholder="Age"
                     />
                </div>
                <div className="form-group d-flex flex-column py-2">
                    <label htmlFor='category'>Category</label>
                    <CustomRadioButton name='category' buttonData={animalCategories}/>
                </div>
            </div>
            <div className='py-2'>
                <button type="submit" className="w-100 btn btn-info">Submit</button>
            </div>
        </form>
  );
};

export default CreateAnimalForm;
