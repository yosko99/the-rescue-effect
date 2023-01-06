import { gql } from '@apollo/client';

export const CREATE_ANIMAL_MUTATION = gql`
  mutation CreateAnimal($input: CreateAnimalInput!) {
    createAnimal(input: $input) {
      title
    }
  }
`;
