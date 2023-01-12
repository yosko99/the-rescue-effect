import gql from 'graphql-tag';

export const CREATE_ANIMAL_MUTATION = gql`
  mutation CreateAnimal($input: CreateAnimalInput!) {
    createAnimal(input: $input) {
      id
      name
      age
      description
      category
      imageURL
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

export const UPDATE_ANIMAL_MUTATION = gql`
  mutation UpdateAnimal($input: UpdateAnimalInput!) {
    updateAnimal(input: $input) {
      id
      name
      age
      isAdopted
      description
      category
      imageURL
    }
  }
`;
