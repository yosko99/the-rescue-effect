import { gql } from '@apollo/client';

export const CREATE_ANIMAL_MUTATION = gql`
  mutation createAnimal($input: CreateAnimalInput!) {
    createAnimal(input: $input) {
      name
    }
  }
`;
