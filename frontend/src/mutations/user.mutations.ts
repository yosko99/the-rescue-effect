import { gql } from '@apollo/client';

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      message
      token
    }
  }
`;

export interface ICreateUserResponse {
  createUser: {
    message: string;
    token: string;
  };
}

export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      message
      token
    }
  }
`;

export interface ILoginResponse {
  login: {
    message: string;
    token: string;
  };
}

export const ADOPT_ANIMAL_MUTATION = gql`
  mutation AdoptAnimal($animalID: String!) {
    adoptAnimal(animalID: $animalID) {
      message
    }
  }
`;

export interface IAdoptAnimalResponse {
  adoptAnimal: {
    message: string;
  };
}

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
