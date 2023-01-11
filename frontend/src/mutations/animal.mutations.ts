import { gql } from '@apollo/client';

export const CREATE_ANIMAL_MUTATION = gql`
  mutation createAnimal($input: CreateAnimalInput!) {
    createAnimal(input: $input) {
      name
    }
  }
`;

export const DELETE_ANIMAL_MUTATION = gql`
  mutation DeleteAnimal($id: String!) {
    deleteAnimal(id: $id) {
      message
    }
  }
`;
