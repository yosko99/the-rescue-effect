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
      createdAt
    }
  }
`;

export const GET_ANIMALS_FOR_ADOPTION_QUERY = gql`
  query GetAnimalsForAdoption {
    getAnimalsForAdoption {
      name
      id
      age
      description
      category
      imageURL
      createdAt
    }
  }
`;
