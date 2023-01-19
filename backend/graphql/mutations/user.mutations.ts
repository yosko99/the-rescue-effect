import gql from 'graphql-tag';

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      user {
        id
        name
        email
        gender
        animalPreferences
        imageURL
        animals {
          id
          name
          age
          isAdopted
          description
          category
          imageURL
        }
      }
      message
      token
    }
  }
`;

export const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($deleteUserId: String!) {
    deleteUser(id: $deleteUserId) {
      message
    }
  }
`;

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
      name
      email
      gender
      animalPreferences
      imageURL
      animals {
        id
        name
        age
        isAdopted
        description
        category
        imageURL
      }
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      message
      token
    }
  }
`;

export const ADOPT_ANIMAL_MUTATION = gql`
  mutation AdoptAnimal($animalId: String!) {
    adoptAnimal(animalID: $animalId) {
      message
    }
  }
`;

export const UPDATE_CURRENT_USER_MUTATION = gql`
  mutation UpdateCurrentUser($input: UpdateCurrentUserInput!) {
    updateCurrentUser(input: $input) {
      id
      name
      email
      gender
      animalPreferences
      imageURL
    }
  }
`;
