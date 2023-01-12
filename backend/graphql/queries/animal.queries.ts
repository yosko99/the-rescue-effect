import gql from 'graphql-tag';

export const GET_ANIMALS_QUERY = gql`
  query {
    animals {
      name
    }
  }
`;

export const GET_ANIMAL_QUERY = gql`
  query GetAnimal($getAnimalId: String!) {
    getAnimal(id: $getAnimalId) {
      name
    }
  }
`;

export const GET_ANIMALS_FOR_ADOPTION_QUERY = gql`
  query GetAnimalsForAdoption {
    getAnimalsForAdoption {
      name
      isAdopted
    }
  }
`;
