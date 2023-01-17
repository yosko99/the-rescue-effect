import gql from 'graphql-tag';

export const GET_USERS_QUERY = gql`
  query Query {
    users {
      name
      id
      email
      animalPreferences
      imageURL
      gender
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

export const GET_USER_QUERY = gql`
  query GetUser($getUserId: String!) {
    getUser(id: $getUserId) {
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

export const GET_CURRENT_USER_QUERY = gql`
  query GetCurrentUser {
    getCurrentUser {
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
