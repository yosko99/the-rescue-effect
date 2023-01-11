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