import React, { useState } from 'react';

import { useMutation } from '@apollo/client';

import { CREATE_ANIMAL_MUTATION } from '../mutations/createAnimalMutation';
import { GET_ANIMALS_QUERY } from '../queries/getAnimalsQuery';
import { CreateAnimalType } from '../types/animal.type';

const CreateAnimalForm = () => {
  const [animalData, setAnimalData] = useState<CreateAnimalType>({
    category: '',
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
                <div className="form-group">
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
                <div className="form-group">
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
                <div className="form-group">
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
                <div className="form-group">
                    <label htmlFor='category'>Category</label>
                    <input
                        type="text"
                        required
                        className="form-control"
                        id="category"
                        name='category'
                        placeholder="Category"
                     />
                </div>
            </div>
            <div>
                <button type="submit" className="w-100 btn btn-success">Submit</button>
            </div>
        </form>
  );
};

export default CreateAnimalForm;
