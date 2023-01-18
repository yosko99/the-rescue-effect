import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { Alert } from 'react-bootstrap';

import animalCategories from '../../constants/animalCategories';
import { CREATE_ANIMAL_MUTATION } from '../../mutations/animal.mutations';
import { GET_ANIMALS_FOR_ADOPTION_QUERY } from '../../queries/animal.queries';
import { ICreateAnimal } from '../../types/animal.type';
import CustomInputWithLabel from '../inputs/CustomInputWithLabel';
import CustomRadioButton from '../inputs/CustomRadioButton';

const CreateAnimalForm = () => {
  const [animalData, setAnimalData] = useState<ICreateAnimal>({
    category: 'DOG',
    description: '',
    age: 1,
    name: ''
  });
  const [alert, setAlert] = useState<React.ReactNode>(null);

  const [createAnimal] = useMutation(CREATE_ANIMAL_MUTATION);

  const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
    const target = e.target as HTMLInputElement;

    setAnimalData(() => {
      return {
        ...animalData,
        [target.name as keyof ICreateAnimal]: target.name === 'age' ? Number(target.value) : target.value
      };
    });
    setAlert(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createAnimal({
      variables: { input: animalData },
      refetchQueries: [GET_ANIMALS_FOR_ADOPTION_QUERY]
    });
    setAlert(null);
    setAlert(<Alert variant='success' className='text-center mt-2'>
      You have successfully added animal for adoption.
    </Alert>);
  };

  return (
        <form className='d-flex flex-column mb-2 px-5 pb-3' onChange={(e) => handleChange(e)} onSubmit={(e) => handleSubmit(e)}>
            <div>
                <CustomInputWithLabel label='Name' name='name'/>
                <CustomInputWithLabel label='Description' name='description'/>
                <CustomInputWithLabel label='Age' name='age' type='number'/>
                <div className="form-group d-flex flex-column py-2">
                    <label htmlFor='category'>Category</label>
                    <CustomRadioButton name='category' buttonData={animalCategories}/>
                </div>
            </div>
            <div className='py-2'>
                <button type="submit" className="w-100 btn btn-info">Submit</button>
            </div>
            {alert}
        </form>
  );
};

export default CreateAnimalForm;
