import { gql } from '@apollo/client';

export const GET_ANIMALS_QUERY = gql`
  query GetAnimals {
    animals {
      id
      name
      age
      description
      category
      imageURL
    }
  }
`;
